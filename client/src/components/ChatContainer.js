import ChatHeader from '../components/ChatHeader';
import MatchesDisplay from '../components/MatchesDisplay';
import ChatDisplay from '../components/ChatDisplay';
import {useState} from "react";

const ChatContainer = ({user}) => {

    console.log()

    const [clickedUser, setClickedUser] = useState(null);

    return (
        <div className = "chat-container">
            <ChatHeader user = {user}/>
            <div>
                <button className = "option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className = "option" disabled = {!clickedUser}>Chat</button>
            </div>

            <div className="matches-and-chat">
                {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}

                {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
            </div>
        </div>
    )
}

export default ChatContainer;