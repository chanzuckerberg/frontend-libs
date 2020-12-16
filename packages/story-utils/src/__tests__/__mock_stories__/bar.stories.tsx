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
