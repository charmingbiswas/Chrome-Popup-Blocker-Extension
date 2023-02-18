import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp';

const rootDiv = document.createElement('div');
rootDiv.id = 'root';
rootDiv.innerText = 'Sup';
const body = document.body;
document.title = 'Chrome Popup Blocker Extension';

if (body) {
    body.prepend(rootDiv);
}

ReactDOM.createRoot(rootDiv).render(<MainApp />);
