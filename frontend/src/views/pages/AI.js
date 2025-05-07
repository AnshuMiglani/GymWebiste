import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import "../BodyMap.css";
import LoginPromptModal from '../LoginPromptModal.js';
import "../LoginPromptModal.css";
import axios from "axios";
export default function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const aiText = data?.reply || "No response.";
      const plainText = aiText.replace(/\*\*/g, '').replace(/\*/g, '');
      const aiMessage = { sender: "ai", text: plainText };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Error fetching response." },
      ]);
    }

    setLoading(false);
  };

  const [IsAuth,setIsAuth]= useState(false);
    const [showModal,setshowModal]= useState(false);
    useEffect(()=>{
      axios.get("http://localhost:8000/auth-status",{withCredentials:true})
      .then((res) => {setIsAuth(res.data.Ispresent);
        if(res.data.Ispresent){
            setshowModal(false);
        }
        else{
            setshowModal(true);
        }
      })
      .catch(()=>{setIsAuth(false);setshowModal(true)});
    },[]);
  return (
    <div className="flex items-center justify-center p-2">
      <div className="w-[650px] h-[620px] bg-[#111] text-white flex flex-col border border-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-4 py-3 font-semibold text-lg flex justify-between">
          💪 FitBot AI Chat
          <Link to="/"><p>x</p></Link>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 your-message-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] px-4 py-2 rounded-xl whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-red-600 text-white ml-auto"
                  : "bg-gray-700 text-white mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="bg-gray-600 text-white px-4 py-2 rounded-xl max-w-[60%] mr-auto">
              Thinking...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-[#1a1a1a] px-4 py-3 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 rounded-lg text-black"
              placeholder="Type your message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askGemini()}
            />
            <button
              type="button"
              onClick={askGemini}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
      {showModal && <LoginPromptModal onClose={() => setshowModal(false)} />}
    </div>
  );
}
