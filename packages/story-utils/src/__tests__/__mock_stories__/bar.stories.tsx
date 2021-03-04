/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

function Bar() {
  return <div>hi</div>;
}

export default {
  title: 'Bar',
  component: Bar,
};

export const BarStory1 = () => <Bar />;

export const BarStory2 = () => (
  <div>
    <Bar />
    <span>2</span>
  </div>
);
BarStory2.parameters = {
  snapshot: {
    skip: true,
  },
};
