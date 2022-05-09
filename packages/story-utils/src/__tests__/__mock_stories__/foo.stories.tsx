/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function Foo() {
  return <div>hi</div>;
}

export default {
  title: 'Foo',
  component: Foo,
};

export const FooStory1 = () => <Foo />;

export const FooStory2 = () => (
  <div>
    <Foo />
    <span>2</span>
  </div>
);
FooStory2.parameters = {
  snapshot: {
    skip: true,
  },
};
