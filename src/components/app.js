import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import Chat from './chat';
import Lobby from './lobby';

const App = () => (
    <div>
        <div className="container">
            <h1 className="center-align">Fire 🔥 Chat</h1>
            <Lobby/>
        </div>
    </div>
);

export default App;
