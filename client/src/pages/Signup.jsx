// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function Signup() {
//   const [form, setForm] = useState({ email: "", password: "", skills: [] });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(form),
//         }
//       );

//       const data = await res.json();
//       console.log("Signup response:", data); // Add this


//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/");
//       } else {
//         alert(data.message || "Email already exists ");
//       }
//     } catch (err) {
//       alert("Something went wrong");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//     <>
//     <Navbar/>
//     <div className="min-h-screen flex items-center justify-center bg-base-200">
//       <div className="card w-full max-w-sm shadow-xl bg-base-100">
//         <form onSubmit={handleSignup} className="card-body">
//           <h2 className="card-title justify-center">Sign Up</h2>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="input input-bordered"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="input input-bordered"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />

//           <div className="form-control mt-4">
//             <button
//               type="submit"
//               className="btn btn-primary w-full"
//               disabled={loading}
//             >
//               {loading ? "Signing up..." : "Sign Up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>

//     </>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            skills: form.skills.split(",").map((s) => s.trim()), // Convert CSV to array
          }),
        }
      );

      const data = await res.json();
      console.log("Signup response:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message || "Email already exists 😊 || you need to login if you already have an account");
        navigate("/login");
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-base-100"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account ✨</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <label className="input input-bordered flex items-center gap-2">
              <FiMail className="text-lg" />
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <FiLock className="text-lg" />
              <input
                type="password"
                name="password"
                className="grow"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <FiUser className="text-lg" />
              <input
                type="text"
                name="skills"
                className="grow"
                placeholder="Skills (comma-separated)"
                value={form.skills}
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-sm text-center mt-4 opacity-70">
            Already have an account?{" "}
            <span
              className="link link-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
}

