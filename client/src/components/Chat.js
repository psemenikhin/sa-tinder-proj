const Chat = ({descendingOrderMessages}) => {
return (
    <>
        <div className="chat-display">
            {descendingOrderMessages.map((message, _index) => (
                <div key={_index}>
                    <div className="chat-message-header">
                        <div className="img-container">
                            <img src={message.img} alt={message.name + ' profile'}/>
                        </div>
                        <p>{message.name}</p>
                    </div>
                    <div className = "message-container">
                    <p className="message">{message.message}</p>
                    <p className="timestamp">{message.timestamp}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
)
}

export default Chat