import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../BodyMap.css";
import LoginPromptModal from '../LoginPromptModal.js';
import "../LoginPromptModal.css";
import axios from "axios";

export default function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am FitBot, your AI fitness coach. Ask me anything about workouts, diet, macros, or gym exercises!" }
  ]);
  const [loading, setLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");

  useEffect(() => {
    axios.get(`${backendUrl}/auth-status`, { withCredentials: true })
      .then((res) => {
        if (res.data.Ispresent) {
          setshowModal(false);
        } else {
          setshowModal(true);
        }
      })
      .catch(() => {
        setshowModal(true);
      });
  }, [backendUrl]);

  const askGemini = async () => {
    if (!prompt.trim() || loading) return;

    const userMessage = { sender: "user", text: prompt.trim() };
    setMessages((prev) => [...prev, userMessage]);
    const currentPrompt = prompt.trim();
    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/ask`, { prompt: currentPrompt });
      const aiText = res.data?.reply || res.data?.error || "No response received.";
      const plainText = typeof aiText === "string" ? aiText.replace(/\*\*/g, '').replace(/\*/g, '') : JSON.stringify(aiText);
      const aiMessage = { sender: "ai", text: plainText };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("FitBot error:", err);
      const errMsg = err.response?.data?.error || err.message || "Unable to reach FitBot. Please check your backend connection.";
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `❌ ${errMsg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-2 min-h-screen bg-black/90">
      <div className="w-[650px] h-[620px] bg-[#111] text-white flex flex-col border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-5 py-4 font-bold text-lg flex justify-between items-center shadow-md">
          <span>💪 FitBot AI Coach</span>
          <Link to="/" className="text-white hover:text-gray-200 text-xl font-bold px-2">✕</Link>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 your-message-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl whitespace-pre-wrap leading-relaxed text-sm ${
                msg.sender === "user"
                  ? "bg-red-600 text-white ml-auto rounded-tr-none shadow"
                  : "bg-zinc-800 text-gray-100 mr-auto rounded-tl-none border border-zinc-700 shadow"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="bg-zinc-800 text-gray-300 px-4 py-2.5 rounded-2xl max-w-[60%] mr-auto rounded-tl-none border border-zinc-700 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              FitBot is analyzing...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-[#18181b] px-4 py-3.5 border-t border-zinc-800">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
              placeholder="Ask about workouts, diet, protein, calorie deficit..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askGemini()}
              disabled={loading}
            />
            <button
              type="button"
              onClick={askGemini}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 active:scale-95 transition text-white font-medium px-5 py-2.5 rounded-xl text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {showModal && <LoginPromptModal onClose={() => setshowModal(false)} />}
    </div>
  );
}
