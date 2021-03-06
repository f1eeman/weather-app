import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './scss/style.scss';

const App = () => (
  <div className="block">
    <b>Hello world!</b>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
