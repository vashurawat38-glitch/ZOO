export default function ChatButton({ onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="fixed bottom-4 right-4 bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition"
    >
      💬
    </button>
  );
}
