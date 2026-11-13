
import { useState } from "react";
import { useForumMessages } from "./hooks/useForumMessages";
import "./App.css";

function App() {
  const [channelId, setChannelId] = useState("general");

  const { msgs, loading, error } = useForumMessages(channelId);

  return (
    <div className="app">
      <header className="header">
        <span className="tag">COMMUNITY FORUM</span>
        <h1>Forum Messages</h1>
        <p>Explore conversations across different channels</p>
      </header>

      <main className="forum-container">
        <aside className="sidebar">
          <h2>Channels</h2>

          {["general", "react", "node"].map((channel) => (
            <button
              key={channel}
              className={`channel-button ${
                channelId === channel ? "active" : ""
              }`}
              onClick={() => setChannelId(channel)}
            >
              <span>#</span> {channel}
            </button>
          ))}
        </aside>

        <section className="messages-panel">
          <div className="messages-header">
            <div>
              <span className="channel-label">CURRENT CHANNEL</span>
              <h2># {channelId}</h2>
            </div>
            <span className="message-count">{msgs.length} messages</span>
          </div>

          {loading && (
            <p className="status-message">Loading messages...</p>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}

          {!loading && !error && (
            <dl className="message-list">
              {msgs.map((msg) => (
                <div className="message-card" key={msg.id}>
                  <dt>{msg.author}</dt>
                  <dd>{msg.content}</dd>
                  <small>
                    {new Date(msg.createdAt).toLocaleString()}
                  </small>
                </div>
              ))}
            </dl>
          )}

          {!loading && !error && msgs.length === 0 && (
            <p className="status-message">No messages in this channel.</p>
          )}
        </section>
      </main>

      <footer>
        Data Fetching & Express Hygiene © 2026
      </footer>
    </div>
  );
}

export default App;
