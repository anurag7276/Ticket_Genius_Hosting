// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function Tickets() {
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   const fetchTickets = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         headers: { Authorization: `Bearer ${token}` },
//         method: "GET",
//       });
//       const data = await res.json();
//       setTickets(data.tickets || []);
//     } catch (err) {
//       console.error("Failed to fetch tickets:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setForm({ title: "", description: "" });
//         fetchTickets(); // Refresh list
//       } else {
//         alert(data.message || "Ticket creation failed");
//       }
//     } catch (err) {
//       alert("Error creating ticket");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

//       <form onSubmit={handleSubmit} className="space-y-3 mb-8">
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Ticket Title"
//           className="input input-bordered w-full"
//           required
//         />
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Ticket Description"
//           className="textarea textarea-bordered w-full"
//           required
//         ></textarea>
//         <button className="btn btn-primary" type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Submit Ticket"}
//         </button>
//       </form>

//       <h2 className="text-xl font-semibold mb-2">All Tickets</h2>
//       <div className="space-y-3">
//         {tickets.map((ticket) => (
//           <Link
//             key={ticket._id}
//             className="card shadow-md p-4 bg-gray-800"
//             to={`/tickets/${ticket._id}`}
//           >
//             <h3 className="font-bold text-lg">{ticket.title}</h3>
//             <p className="text-sm">{ticket.description}</p>
//             <p className="text-sm text-gray-500">
//               Created At: {new Date(ticket.createdAt).toLocaleString()}
//             </p>
//           </Link>
//         ))}
//         {tickets.length === 0 && <p>No tickets submitted yet.</p>}
//       </div>
//     </div>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function Tickets() {
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   const fetchTickets = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setTickets(data.tickets || []);
//     } catch (err) {
//       console.error("Failed to fetch tickets:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setForm({ title: "", description: "" });
//         fetchTickets(); // Refresh list
//       } else {
//         alert(data.message || "Ticket creation failed");
//       }
//     } catch (err) {
//       alert("Error creating ticket");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-4 max-w-4xl mx-auto bg-white dark:bg-gray-900 mt-2">
//         {/* Create Ticket Form */}
//         <div className=" rounded-xl p-6 shadow-md mb-8  ">
//           <h2 className="text-2xl font-bold text-white mb-4 " >Create Ticket</h2>

//           <form onSubmit={handleSubmit} className="space-y-4 ">
//             <input
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               placeholder="Ticket Title"
//               className="input input-bordered w-full"
//               required
//             />
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Ticket Description"
//               className="textarea textarea-bordered w-full"
//               rows="4"
//               required
//             />
//             <button
//               className="btn btn-primary w-full sm:w-auto"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Submit Ticket"}
//             </button>
//           </form>
//         </div>

//         {/* Ticket List */}
//         <div>
//           <h2 className="text-xl font-semibold text-white mb-3">All Tickets</h2>

//           <div className="space-y-4">
//             {tickets.map((ticket) => (
//               <Link
//                 key={ticket._id}
//                 to={`/tickets/${ticket._id}`}
//                 className="block bg-gray-800 rounded-lg p-4 shadow hover:bg-gray-700 transition-all"
//               >
//                 <h3 className="text-lg font-bold text-white">{ticket.title}</h3>
//                 <p className="text-gray-300 text-sm mb-1">{ticket.description}</p>
//                 <p className="text-gray-500 text-xs">
//                   Created At: {new Date(ticket.createdAt).toLocaleString()}
//                 </p>
//               </Link>
//             ))}
//             {tickets.length === 0 && (
//               <p className="text-gray-400">No tickets submitted yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ title: "", description: "" });
        fetchTickets(); // Refresh list
      } else {
        alert(data.message || "Ticket creation failed");
      }
    } catch (err) {
      alert("Error creating ticket");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-4 max-w-4xl mx-auto bg-base-200 min-h-screen transition-colors duration-300 mt-3">
        {/* Create Ticket Form */}
        <div className="rounded-xl p-6 shadow-md mb-8 bg-base-100 transition-colors duration-300">
          <h2 className="text-2xl font-bold  mb-4">Create Ticket</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ticket Title"
              className="input input-bordered w-full"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ticket Description"
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            />
            <button
              className="btn btn-primary w-full sm:w-auto"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>

        {/* Ticket List */}
        <div>
          <h2 className="text-xl font-semibold mb-3">All Tickets</h2>

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/tickets/${ticket._id}`}
                className="block bg-base-100  rounded-lg p-4 shadow hover:bg-base-300  transition-all"
              >
                <h3 className="text-lg font-bold ">{ticket.title}</h3>
                <p className="text-sm mb-1">{ticket.description}</p>
                <p className="text-xs">
                  Created At: {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </Link>
            ))}
            {tickets.length === 0 && (
              <p className="">No tickets submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
