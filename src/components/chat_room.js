import React from 'react';
import { connect } from 'react-redux';
import { getRoomData, getChatLog, sendNewMessage } from '../actions';
import { db } from '../firebase';


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = { message: '' };
    }

    componentDidMount() {
        const { roomId, logId } = this.props.match.params

        this.props.getRoomData(roomId);

       db,ref(`/chat-logs/${logId}`).on('value', snapshot =>{
           this.props.getChatLog(snapshot.val());
       })
    }

    componentWillUnmount(){
        db.ref(`/chat-logs/${this.props.match.params.logId}`).off();
    }


    sendMessage(e) {
        e.preventDefault();

        this.props.sendNewMessage(
            this.props.roomInfo.chatLogId,
            this.state.message);

        this.setState({ message: '' });
    }

    render() {
        const { name } = this.props.roomInfo;
        const { chatLog } = this.props;
        const msgs = Object.keys(chatLog).reverse().map((key) => {
            return <li key={key} className="collection-item">{chatLog[key]}</li>
        });

        return (
            <div>
                <h3>{name ? name : 'Loading'}</h3>
                <form onSubmit={this.sendMessage.bind(this)}>
                    <label>Enter Message:</label>
                    <input type="text" value={this.state.message} onChange={e => this.setState({ message: e.target.value })} />
                    <button>Send Message</button>
                </form>

                <ul className="collection">{msgs}</ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomInfo: state.chat.currentRoom,
        chatLog: state.chat.chatLog
    }
}

export default connect(mapStateToProps, { getRoomData, getChatLog, sendNewMessage })(ChatRoom);