
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import Navbar from "../components/Navbar";

// export default function TicketDetailsPage() {
//   const { id } = useParams();
//   const [ticket, setTicket] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await res.json();
//         if (res.ok) {
//           setTicket(data.ticket);
//         } else {
//           alert(data.message || "Failed to fetch ticket");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTicket();
//   }, [id]);

//   if (loading)
//     return <div className="text-center mt-10">Loading ticket details...</div>;
//   if (!ticket) return <div className="text-center mt-10">Ticket not found</div>;

//   return (
//     <>
//     <Navbar/>
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>

//       <div className="card bg-gray-800 shadow p-4 space-y-4">
//         <h3 className="text-xl font-semibold">{ticket.title}</h3>
//         <p>{ticket.description}</p>

//         {/* Conditionally render extended details */}
//         {ticket.status && (
//           <>
//             <div className="divider">Metadata</div>
//             <p>
//               <strong>Status:</strong> {ticket.status}
//             </p>
//             {ticket.priority && (
//               <p>
//                 <strong>Priority:</strong> {ticket.priority}
//               </p>
//             )}

//             {ticket.relatedSkills?.length > 0 && (
//               <p>
//                 <strong>Related Skills:</strong>{" "}
//                 {ticket.relatedSkills.join(", ")}
//               </p>
//             )}

//             {ticket.helpfulNotes && (
//               <div>
//                 <strong>Helpful Notes:</strong>
//                 <div className="prose max-w-none rounded mt-2">
//                   <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
//                 </div>
//               </div>
//             )}

//             {ticket.assignedTo && (
//               <p>
//                 <strong>Assigned To:</strong> {ticket.assignedTo?.email}
//               </p>
//             )}

//             {ticket.createdAt && (
//               <p className="text-sm text-gray-500 mt-2">
//                 Created At: {new Date(ticket.createdAt).toLocaleString()}
//               </p>
//             )}
//           </>
//         )}
//       </div>
//     </div>

//     </>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setTicket(data.ticket);
        else alert(data.message || "Failed to fetch ticket");
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading ticket details...</div>;
  if (!ticket) return <div className="text-center mt-10">Ticket not found</div>;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Ticket Details</h2>

        <div className=" shadow-lg rounded-lg p-6 space-y-4 border border-gray-300 dark:border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{ticket.title}</h3>
          <p className="">{ticket.description}</p>

          {ticket.status && (
            <>
              <div className="border-t border-gray-400 dark:border-gray-600 pt-4">
                <p>
                  <span className="font-semibold">Status:</span> {ticket.status}
                </p>

                {ticket.priority && (
                  <p>
                    <span className="font-semibold">Priority:</span> {ticket.priority}
                  </p>
                )}

                {ticket.relatedSkills?.length > 0 && (
                  <p>
                    <span className="font-semibold">Related Skills:</span>{" "}
                    {ticket.relatedSkills.join(", ")}
                  </p>
                )}

                {ticket.helpfulNotes && (
                  <div>
                    <p className="font-semibold mb-1">Helpful Notes:</p>
                    <div className="prose max-w-none prose-sm dark:prose-invert  p-3 rounded">
                      <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {ticket.assignedTo && (
                  <p>
                    <span className="font-semibold">Assigned To:</span> {ticket.assignedTo?.email}
                  </p>
                )}

                {ticket.createdAt && (
                  <p className="text-sm  mt-2">
                    Created At: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
