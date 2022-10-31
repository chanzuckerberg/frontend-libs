import {Heading} from '@chanzuckerberg/eds';
import SFWeather from '../components/SFWeather';

export default function Root() {
  return (
    <main className="p-5">
      <Heading size="h2">Hello world</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      <SFWeather />
    </main>
  );
}
