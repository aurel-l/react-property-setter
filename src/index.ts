import { createElement, useRef, useEffect, ReactNode, useState } from 'react';

interface PropertySetterProps {
  children: ReactNode;
  target?: string;
  property: string;
  value?: any;
}

// just to make sure that the component we use doesn't have any effect on layout
const styleProps = { display: 'contents' };

const PropertySetter = ({
  children,
  target,
  property,
  value,
}: PropertySetterProps) => {
  const domRef = useRef<HTMLDivElement>(null);

  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const targetElement =
      domRef.current &&
      domRef.current.querySelector(
        `${target || '*'}:not([data-property-setter])`,
      );
    if (!targetElement) return;

    if (isWaiting) {
      if (targetElement.tagName.includes('-')) {
        // custom element, wait for definition
        customElements
          .whenDefined(targetElement.tagName.toLowerCase())
          .then(() => setIsWaiting(false));
      } else {
        setIsWaiting(false);
      }
      return;
    }
    // @ts-ignore
    targetElement[property] = value;
  }, [target, children, property, value, isWaiting]);

  // render a container to dispatch the DOM event from
  return createElement(
    'div',
    { style: styleProps, 'data-property-setter': true, ref: domRef },
    children,
  );
};

export default PropertySetter;
