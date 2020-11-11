const storiesPattern = /\.stories\.(?:js|ts)x?$/;

export default function isStories(filename: string): boolean {
  return storiesPattern.test(filename);
}
