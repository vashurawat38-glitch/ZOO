import Chatbot from "./Chatbot";

export default function ChatWindow({ onClose }) {
  return (
    <div className="fixed bottom-20 right-4 w-72 sm:w-96 bg-white shadow-lg rounded-lg flex flex-col z-[999] h-96 sm:h-[28rem]">
      {/* ✅ Header */}
      <div className="bg-green-600 text-white p-2 flex justify-between items-center rounded-t-lg">
        <span className="font-semibold">Support Bot</span>
        <button 
          onClick={onClose} 
          className="hover:text-yellow-300 transition"
        >
          ✖
        </button>
      </div>

      {/* ✅ Chatbot Component */}
      <Chatbot />
    </div>
  );
}
