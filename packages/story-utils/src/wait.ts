import { act } from '@testing-library/react';

export default async function wait(ms = 0): Promise<void> {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}
