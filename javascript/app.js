const searchButton = document.querySelector('.searchButton');
const searchInput = document.querySelector('.searchBox');
searchButton.addEventListener('click', fetchWeather);
searchInput.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		fetchWeather();
	}
});

function fetchWeather() {
	const city = searchInput.value;
	fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=m`)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('invalid input');
			}
		})
		.then((data) => {
			const time = getTime(data);
			updateWeather(data, time);
		})
		.catch((error) => {
			console.log(error);
		});
}

function getTime(data) {
	const { localtime } = data.location;
	const timeTwentyFour = localtime.slice(11, 17);
	const hour = parseInt(timeTwentyFour.substring(0, 2));
	const minute = parseInt(timeTwentyFour.substring(3, 4)).toString() + parseInt(timeTwentyFour.substring(4, 5)).toString();

	let time = [];
	if (hour >= 12) {
		time[0] = 'PM';
	} else {
		time[0] = 'AM';
	}
	time[1] = (((hour + 11) % 12) + 1).toString() + ':' + minute;
	return time;
}

function updateWeather(data, time) {
	const { name } = data.location;
	const { weather_icons, weather_descriptions, temperature, humidity, feelslike } = data.current;
	info = [name, weather_icons, weather_descriptions, temperature, humidity, feelslike];
	document.querySelector('.city').innerText = 'Weather in ' + info[0];
	document.querySelector('.time').innerHTML = 'Time in ' + info[0] + ' is ' + time[1] + time[0];
	document.querySelector('.temp').innerText = info[3] + '°C';
	document.querySelector('.description').innerText = info[2];
	document.querySelector('.humidity').innerText = 'Humidity: ' + info[4];
	document.querySelector('.feels').innerText = 'Feels like: ' + info[3] + '°C';
}
