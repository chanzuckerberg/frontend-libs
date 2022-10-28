type WeatherResponse = {
  current_weather: {
    temperature: number;
  };
};

export function getTemp(lat: number, long: number) {
  return fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&temperature_unit=fahrenheit&current_weather=true`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((json: WeatherResponse) => {
      return json.current_weather.temperature;
    });
}
