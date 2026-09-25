export default function ChatButton({ onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 rounded-full shadow-lg hover:bg-emerald-600 transition"
    >
      <span className="text-4xl leading-none">🐼</span>
    </button>
  );
}
