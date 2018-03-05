import React from 'react';
import { db } from '../firebase';

class Lobby extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            roomName: ''
        }
    }


    handleCreateRoom(e) {
        const { roomName } = this.state;

        e.preventDefault();

        console.log('Room Name: ', roomName);

        const newRoom = {
            name: roomName,
            chatLog: [`Room: ${roomName}`]
        }

        db.ref('/chat-rooms')
            .push(newRoom)
            .then(resp =>{
                console.log('Add Room Response: ', resp);
            });
    }

    render() {
        const { roomName } = this.state;
        return (
            <div>
                <h3>Chat Lobby</h3>
                <form onSubmit={this.handleCreateRoom.bind(this)}>
                    <label>Chat Room Name</label>
                    <input type="text" onChange={e => this.setState({ roomName: e.target.value })} value={roomName} />
                    <button>Create Room</button>
                </form>
            </div>
        )
    }
}

export default Lobby;