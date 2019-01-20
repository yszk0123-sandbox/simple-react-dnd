import * as React from 'react';
import { render } from 'react-dom';
import { Example } from './Example';

function App() {
  return <Example />;
}

const appElement = document.getElementById('app');
render(<App />, appElement);
