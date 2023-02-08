import ChatHeader from '../components/ChatHeader';
import MatchesDisplay from '../components/MatchesDisplay';
import ChatDisplay from '../components/ChatDisplay';

const ChatContainer = ({user}) => {
    return (
        <div className = "chat-container">
            <ChatHeader user = {user}/>
            <div>
                <button className = "option">Matches</button>
                <button className = "option">Chat</button>
            </div>

            <div className="matches-and-chat">
            <MatchesDisplay/>

            <ChatDisplay/>
            </div>
        </div>
    )
}

export default ChatContainer;