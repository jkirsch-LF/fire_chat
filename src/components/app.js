import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import Lobby from './lobby';
import ChatRoom from './chat_room';

import { Route } from 'react-router-dom';



const App = () => (
    <div>
        <div className="container">
            <h1 className="center-align">Fire 🔥 Chat</h1>

            <Route exact path="/" component={Lobby} />
            <Route path="/room/:roomId/log/:logId" component={ChatRoom} />

        </div>
    </div>
);

export default App;
