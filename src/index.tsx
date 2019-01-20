import * as React from 'react';
import { render } from 'react-dom';
// import { Example } from './example-1/Example';
import { Example } from './example-2/Example';

function App() {
  return (
    <>
      <Example />
    </>
  );
}

const appElement = document.getElementById('app');
render(<App />, appElement);
