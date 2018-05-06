# Position

[source][source] | [storybook][storybook]

Position is a low-level component that reports the cursor position on each `mousemove` event on the `onChange` callback function. It's used in [Surfaces](../Surface.md).

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`property` | Any | _none_ | [An optional identifier][property] to pass along to the callback functions.
`onChange` | Function | _none_ | A callback function that's called on each mouse movement with an object in the form of `{x: …, y: …, event: …}`. When the `property` prop is set, it will be passed back as the second argument.
`onEnd` | Function | _none_ | A callback function that's called when the user finishes the interaction (the `mouseup` event) with an object in the form of `{x: …, y: …, event: …}`. When the `property` prop is set, it will be passed back as the second argument.

## Usage

The example below continously reads the user's mouse coordinates:

```jsx
import React from 'react';
import { Position } from 'uiuiui';

class MyComponent extends React.Component {
      
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>The mouse coordinates are currently {this.state.x}: {this.state.y}</p>
        <Position onChange={ coords => this.setState(coords) } />
      </div>
    );
  }
}

export default MyComponent;
```

We can conditionally add the Position component to the DOM only after the user holds down the mouse (on the `mousedown` event), and stop reading the coordinates on `mouseup`:

```jsx
class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      interacting: false
    };
  }

  render() {
    return (
      <div 
        onMouseDown={ 
          e => { this.setState({ interacting: true }); e.preventDefault(); } 
        }
      >
        <p>
          Hold down the mouse here and move it 
          to read its coordinates: {this.state.x}: {this.state.y}
        </p>
        { 
          this.state.interacting && 
            <Position 
              onChange={ coords => this.setState(coords) } 
              onEnd={ e => this.setState({ interacting: false }) }
            /> 
        }
      </div>
    );
  }
}
```

_Note: these examples use less than ideal React idioms to make them shorter. For better performance, avoid passing inline functions as callbacks._

[source]: ../../components/Position/Position.js
[storybook]: https://danburzo.github.io/uiuiui/storybook-static/?selectedKind=Position
[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md