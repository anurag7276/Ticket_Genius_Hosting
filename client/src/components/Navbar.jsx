// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const token = localStorage.getItem("token");
//   let user = localStorage.getItem("user");
//   if (user) {
//     user = JSON.parse(user);
//   }
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };
//   return (
//     <div className="navbar bg-base-200">
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl">
//           Ticket AI
//         </Link>
//       </div>
//       <div className="flex gap-2">
//         {!token ? (
//           <>
//             <Link to="/signup" className="btn btn-sm">
//               Signup
//             </Link>
//             <Link to="/login" className="btn btn-sm">
//               Login
//             </Link>
//           </>
//         ) : (
//           <>
//             <p>Hi, {user?.email}</p>
//             {user && user?.role === "admin" ? (
//               <Link to="/admin" className="btn btn-sm">
//                 Admin
//               </Link>
//             ) : null}
//             <button onClick={logout} className="btn btn-sm">
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="navbar bg-base-200 shadow-md px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">🎫 Ticket AI</Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleTheme} className="btn btn-ghost text-xl">
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {!token ? (
            <>
              <Link to="/signup" className="btn btn-sm btn-primary">Signup</Link>
              <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">
                Hi, <span className="font-bold">{user?.email}</span>
              </span>

              {user?.role === "admin" && (
                <Link to="/admin" className="btn btn-sm btn-accent">Admin</Link>
              )}

              <button onClick={logout} className="btn btn-sm btn-error text-white">Logout</button>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost text-xl">
            <FiMenu />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed top-0 right-0 w-64 h-full bg-base-100 shadow-lg z-50 p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="btn btn-sm btn-circle">✕</button>
          </div>

          <button onClick={toggleTheme} className="btn btn-sm">
            {theme === "light" ? <><FiMoon /> Dark Mode</> : <><FiSun /> Light Mode</>}
          </button>

          {!token ? (
            <>
              <Link to="/signup" className="btn btn-sm btn-primary" onClick={() => setMenuOpen(false)}>Signup</Link>
              <Link to="/login" className="btn btn-sm btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          ) : (
            <>
              <p className="text-sm">Hi, {user?.email}</p>
              {user?.role === "admin" && (
                <Link to="/admin" className="btn btn-sm btn-accent" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <button onClick={() => { logout(); setMenuOpen(false); }} className="btn btn-sm btn-error text-white">Logout</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

