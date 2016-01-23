import React from 'react';
import ReactDOM from 'react-dom';

import Main from './src/main';

const root=document.createElement("div");
root.setAttribute('id','root');
document.body.appendChild(root);


ReactDOM.render(<Main />,document.getElementById('root'));
