import React from 'react';
import ReactDOM from 'react-dom';
import createClassHome from './s/Home';

import './s/scss/main.scss';

import minAjax from './s/minAjax';

minAjax({
  url: 'http://192.168.2.101:3000/station',
  type: 'get',
  success: (data) => {
    let Home = createClassHome(data);
    ReactDOM.render(< Home />, document.getElementById('root'));
  }
})
