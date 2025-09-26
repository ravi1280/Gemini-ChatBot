import { useState } from 'react'
import './App.css'
import ChatInput from './component/ChatInput'
import ChatResponse from './component/ChatResponse'
import { fetchChatResponse } from './services/api';

function App() {
  const [Response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to fetch response. Please try again.");
    }finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="App">
        {/* Minimalist Header - Same as home */}
        <header className="minimal-header">
          <div className="header-content">
            <div className="brand">
              <div className="brand-icon">
                <i className="bi bi-chat-dots"></i>
              </div>
              <div className="brand-text">
                <h1>Gemini</h1>
                <span>AI Assistant</span>
              </div>
            </div>
          </div>
        </header>

        {/* Minimalist Loading Content */}
        <main className="main-content">
          <div className="content-wrapper">
            <div className="minimal-loading-screen">
              <div className="loading-card">
                <div className="minimal-loading-content">
                  {/* Simple Spinner */}
                  <div className="minimal-spinner">
                    <div className="spinner-circle"></div>
                  </div>
                  
                  {/* Loading Text */}
                  <div className="minimal-loading-text">
                    <h2>Thinking...</h2>
                    <p>Generating your response</p>
                  </div>
                  
                  {/* Simple Progress Indicator */}
                  <div className="minimal-progress">
                    <div className="progress-dot active"></div>
                    <div className="progress-dot"></div>
                    <div className="progress-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Minimalist Header */}
      <header className="minimal-header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon">
              <i className="bi bi-chat-dots"></i>
            </div>
            <div className="brand-text">
              <h1>Gemini</h1>
              <span>AI Assistant</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-wrapper">
          {!Response ? (
            // Welcome Screen
            <div className="welcome-screen">
              <div className="welcome-content">
                <div className="welcome-icon">
                  <i className="bi bi-stars"></i>
                </div>
                <h2>How can I help you today?</h2>
                <p>Ask me anything and I'll provide detailed, helpful responses</p>
                
                {/* Suggestion Cards */}
                <div className="suggestion-cards">
                  <div className="suggestion-card" onClick={() => document.getElementById('question').focus()}>
                    <i className="bi bi-lightbulb"></i>
                    <span>Explain a concept</span>
                  </div>
                  <div className="suggestion-card" onClick={() => document.getElementById('question').focus()}>
                    <i className="bi bi-code-slash"></i>
                    <span>Help with coding</span>
                  </div>
                  <div className="suggestion-card" onClick={() => document.getElementById('question').focus()}>
                    <i className="bi bi-book"></i>
                    <span>Write content</span>
                  </div>
                  <div className="suggestion-card" onClick={() => document.getElementById('question').focus()}>
                    <i className="bi bi-question-circle"></i>
                    <span>Answer questions</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Response Area
            <div className="response-area">
              <ChatResponse response={Response}/>
            </div>
          )}

          {/* Input Section - Always at bottom */}
          <div className="input-section">
            <ChatInput onSubmit={handleQuestionSubmit}/>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App;
