import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
