import {useQuery} from '@tanstack/react-query';
import {getTemp} from '../../api/weather';

const sfCoord = {lat: 37.77, long: -122.43};

export default function SFWeather() {
  const query = useQuery(
    // Query key, which should be unique to this data. Include any query params or ids.
    // https://tanstack.com/query/v4/docs/guides/query-keys
    ['temp', sfCoord.lat, sfCoord.long],
    // Function that actually makes the HTTP request.
    // https://tanstack.com/query/v4/docs/guides/query-functions
    () => getTemp(sfCoord.lat, sfCoord.long),
  );

  return <p>Current San Francisco temp: {query.data ?? '🤔'}</p>;
}
