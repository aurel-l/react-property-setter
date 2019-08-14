import { createElement } from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { frame } from 'timing-functions';

import PropertySetter from '.';

afterEach(cleanup);

describe('<EventEmitter />', () => {
  test('should render, and set and change property', async () => {
    const { container, rerender } = render(
      createElement(
        PropertySetter,
        {
          property: 'width',
          value: 300,
        },
        createElement('canvas'),
      ),
    );

    await act(() => frame());

    expect(container.querySelector('canvas').width).toBe(300);

    rerender(
      createElement(
        PropertySetter,
        {
          property: 'width',
          value: 400,
        },
        createElement('canvas'),
      ),
    );

    await act(() => frame());

    expect(container.querySelector('canvas').width).toBe(400);
  });

  test('should render and set properties', async () => {
    const { container } = render(
      createElement(
        PropertySetter,
        {
          property: 'width',
          value: 300,
        },
        createElement(
          PropertySetter,
          {
            property: 'height',
            value: 400,
          },
          createElement('canvas'),
        ),
      ),
    );

    await act(() => frame());

    expect(container.querySelector('canvas').width).toBe(300);
    expect(container.querySelector('canvas').height).toBe(400);
  });

  test('should render and set property on deep target', async () => {
    const { container } = render(
      createElement(
        PropertySetter,
        {
          property: 'width',
          value: 300,
          target: 'canvas',
        },
        createElement('div', undefined, createElement('canvas')),
      ),
    );

    await act(() => frame());

    expect(container.querySelector('canvas').width).toBe(300);
  });
});
