// // components/MessageList.tsx
// import React, { useEffect, useState } from "react";
// import { getMessagesForUser } from "@/utils/api";
// import { Message } from "@/types/types";
// import { useAuth } from "@/context/AuthContext";

// const MessageList: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const { userId } = useAuth();

//   useEffect(() => {
//     if (userId) {
//       getMessagesForUser(userId)
//         .then((data) => setMessages(data))
//         .catch((error) => console.error(error));
//     }
//   }, [userId]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Messages</h2>
//       <ul>
//         {messages.map((message) => (
//           <li key={message.id} className="mb-2 p-2 border-b border-gray-300">
//             <p>
//               <strong>From:</strong> {message.sender_username}
//             </p>
//             <p>{message.content}</p>
//             <p className="text-sm text-gray-500">
//               {new Date(message.date_sent).toLocaleString()}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MessageList;
