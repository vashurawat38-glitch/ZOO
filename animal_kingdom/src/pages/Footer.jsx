function Footer() {
  return (
    <footer className="bg-emerald-700 hover:bg-[#005a38] text-white p-6 text-center mt-12">
      <div className="space-x-6">
        <a href="#home" className="hover:text-yellow-300">Home</a>
        <a href="#animals" className="hover:text-yellow-300">Animals</a>
        <a href="#tickets" className="hover:text-yellow-300">Tickets</a>
        <a href="#contact" className="hover:text-yellow-300">Contact</a>
      </div>
      <p className="mt-4 text-sm">© 2026 Animal Kingdom Zoo. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
