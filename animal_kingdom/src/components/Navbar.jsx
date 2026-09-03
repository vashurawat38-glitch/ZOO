import React, { useState, useRef, useEffect } from "react";
import { GiElephant } from "react-icons/gi";

export default function Navbar({ user, handleLogout, ticketCount = 0 }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Modal state
  const dropdownRef = useRef(null);

  const getUserName = () => {
    if (!user) return "";
    if (typeof user === "string") return user;
    if (typeof user === "object") return user.name || user.email || "User";
    return "User";
  };

  const getUserEmail = () => {
    if (typeof user === "object" && user.email) return user.email;
    return "Not provided";
  };

  const userName = getUserName();
  const avatarInitial = userName ? userName[0].toUpperCase() : "U";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home"},
    { name: "Animals", href: "#animals" },
    { name: "Tickets", href: "#tickets" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="bg-emerald-700 border-gray-200 sticky top-0 z-40 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-30 items-center">
            
            {/* Logo */}

            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center gap-2 text-2xl font-bold tracking-wide text-white">
                <GiElephant size={80} />
                <span>Animal Kingdom</span>
              </a>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-yellow-500 font-medium text-l transition"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Area */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 font-bold flex items-center justify-center text-xs shadow-sm">
                      {avatarInitial}
                    </div>
                    <span className="text-sm font-medium text-gray-800 hidden sm:inline">
                      {userName}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Card */}
                  {isDropdownOpen && (
                    <div className="fixed top-16 right-4 sm:right-8 w-60 bg-white rounded-xl shadow-2xl py-2 border border-gray-200 z-[9999] whitespace-nowrap">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">
                          {userName}
                        </p>
                      </div>

                      {/* My Tickets Display */}
                      <div className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <span>My Tickets</span>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {ticketCount} Booked
                        </span>
                      </div>

                      {/* Account Settings Button (Opens Modal) */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsSettingsOpen(true);
                        }}
                        className="w-full text-left block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                      >
                        Account Settings
                      </button>

                      {/* Logout */}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="#login"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
                >
                  Login
                </a>
              )}

              {/* Mobile Toggle */}
              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Account Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Account Settings</h3>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Username</label>
                <p className="text-sm font-semibold text-gray-800">{userName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Email</label>
                <p className="text-sm font-semibold text-gray-800">{getUserEmail()}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Status</label>
                <p className="text-sm font-semibold text-emerald-600">Active User</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="w-full mt-2 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}