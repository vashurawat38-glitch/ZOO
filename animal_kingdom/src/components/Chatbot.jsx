import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi, I’m Support Bot!" },
    { from: "bot", text: "📍 You can ask me about tickets, animals, timings, or location." },
    { from: "bot", type: "image", src: "/zoo-welcome.jpg" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch("https://zoo-qnls.onrender.com/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages([...newMessages, { from: "bot", text: data.reply }]);
    } catch {
      setMessages([...newMessages, { from: "bot", text: "❌ Server error" }]);
    }
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 flex-1 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.from === "bot" ? "text-left" : "text-right"}`}>
            {msg.type === "image" ? (
              <img src={msg.src} alt="Zoo Welcome" className="w-40 sm:w-56 rounded shadow mx-auto" />
            ) : (
              <span className={`inline-block px-2 py-1 rounded ${msg.from === "bot" ? "bg-gray-200" : "bg-green-100"}`}>
                {msg.text}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="p-2 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2"
          placeholder="Ask about zoo..."
        />
        <button 
          onClick={sendMessage} 
          className="bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-emerald-700 transition"
        >
          <span>Send</span>
          <span>📩</span>
        </button>
      </div>
    </div>
  );
}
