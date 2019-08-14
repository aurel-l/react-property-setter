[![Property Setter logo](https://img.shields.io/npm/v/react-property-setter)](https://www.npmjs.com/package/react-property-setter)

# react-property-setter

DOM property setter written in React. It is meant to be used directly above (as
a wrapper) the target element.

## Why?

Interacting between React and other libraries can sometimes be a bit cumbersome
because of the difference in paradigms. Maybe in the future React will allow to
work in an easier way with property setters, but for now you'd need to switch
from the usual declarative logic in writting components in JSX to an imperative
way to hook up the logic in React and your other library's logic.

It was originally made to interact with CustomElements inside of a React app.

Anything like a number, a string, or a small array can be fined to pass down
through attributes, but for any other object, or for big arrays, it's better to
keep it out of the DOM and just set a property, which React doesn't allow us to
do yet.

## Requirements, installation and usage

You need to have a recent version Node.js installed with a working `npm` command.

Also, this has `react` and `react-dom` as peer dependencies.

To install, run in a shell:

```shell
npm install react-property-setter
```

Then, in the JavaScript you want to use it, import it as a ES module:

```javascript
import PropertySetter from 'react-property-setter';
```

Or, if you still use commonjs modules for browser code, import it as such:

```javascript
const PropertySetter = require('react-property-setter');
```

To see more, refer to the [examples](#example-usage) section.

## API

### props

| name     | type      | required | default     |
| -------- | --------- | -------- | ----------- |
| children | ReactNode | yes      | `null`      |
| target   | string    | no       | `undefined` |
| property | string    | yes      | `undefined` |
| value    | any       | no       | `undefined` |

### notes

1. The children property must contain only 1 child

2. The target must be the direct child of this element (ignoring any other
   possible instance of PropertySetter), or if not, a target selector string must
   be provided to find the correct element to which to set the property.

## Example usage

### simple

Some DOM element higher up the tree is listening to a `load` event containing some data

```jsx
import PropertySetter from 'react-property-setter';

const Component = ({ width }) => (
  <PropertySetter property="width" value={width}>
    <canvas />
  </PropertySetter>
);
```

_note: this is just an example, you wouldn't want to use this to set a property_
_simply to a number_

### with Custom Elements

If the element to set is identified to be a Custom Element, we'll automatically
wait for its definition before setting its property value.

```jsx
import PropertySetter from 'react-property-setter';

const Component = ({ data }) => (
  <PropertySetter property="data" value={data}>
    <data-visualisation />
  </PropertySetter>
);
```

As a comparison, to write this example **without** the `PropertySetter` helper, you
would need something like:

```jsx
const Component = ({ data }) => {
  const customElementRef = useRef(null);

  useEffect(() => {
    if (customElementRef.current) {
      customElementRef.current.data = data;
    }
  }, [data]);

  return <data-visualisation ref={customElementRef} />;
};
```

### with multiple property/value pairs

Multiple wrappers can be used, they will skip each other when trying to find the
target node.

```jsx
import PropertySetter from 'react-property-setter';

const Component = ({ data, settings }) => (
  <PropertySetter property="data" value={data}>
    <PropertySetter property="settings" value={settings}>
      <data-visualisation />
    </PropertySetter>
  </PropertySetter>
);
```

### deep target

You can provide a

```jsx
import PropertySetter from 'react-property-setter';

const Component = ({ width }) => (
  <PropertySetter property="width" value={width} target=".target-element">
    <div>
      <canvas class="target-element" />
    </div>
  </PropertySetter>
);
```

_note: this is just an example, you wouldn't want to use this to set a property_
_simply to a number_

## Development

Library written in TypeScript.

You can run the tests (unit, linting, and type-checking) by running
`npm run test`.

To build a new bundle, run `npm run build`, or `npm run build:dev` for
development mode.

## Acknowledgement

This package's code was started while working within the
[Molecular Modeling and Bioinformatics (MMB)](https://mmb.irbbarcelona.org/)
group at the
[Institute for Research in Biomedicine (IRB)](https://www.irbbarcelona.org/).
