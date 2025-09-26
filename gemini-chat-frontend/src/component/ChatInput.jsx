import { useState } from "react";

const ChatInput = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    if (question.trim()) {
      onSubmit(question.trim());
      setQuestion("");
    } 

    console.log("User message:", question);
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div className="message-input">
            <label htmlFor="question">
              <i className="bi bi-chat-dots"></i> Enter your message:
            </label>
            <input
              type="text"
              id="question"
              placeholder="Ask me anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="submit-btn">
            <i className="bi bi-send"></i>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
