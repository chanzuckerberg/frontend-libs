type WeatherResponse = {
  current_weather: {
    temperature: number;
  };
};

export async function getTemp(lat: number, long: number) {
  // Make network requests with whichever library or technique you like. This example uses the built-
  // in `fetch` API (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), but you can use
  // other libraries (such as axios) or systems (such as GraphQL).
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&temperature_unit=fahrenheit&current_weather=true`,
  );

  // Reject the returned promise on 4xx or 5xx responses. `fetch` doesn't do that (since those are
  // valid server responses), so we need to manually reject.
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json: WeatherResponse = await response.json();
  return json.current_weather.temperature;
}
