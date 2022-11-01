import {Heading} from '@chanzuckerberg/eds';
import Navigation from '../components/Navigation';

export default function About() {
  return (
    <>
      <Navigation />
      <main className="p-5">
        <Heading size="h2">About</Heading>
        <p>
          I'm baby sriracha PBR&B chillwave +1 hoodie cornhole everyday carry.
        </p>
      </main>
    </>
  );
}
