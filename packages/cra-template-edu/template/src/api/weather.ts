type WeatherResponse = {
  current_weather: {
    temperature: number;
  };
};

export async function getTemp(lat: number, long: number) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&temperature_unit=fahrenheit&current_weather=true`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json: WeatherResponse = await response.json();
  return json.current_weather.temperature;
}
