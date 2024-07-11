// // components/MessageForm.tsx
// import React, { useState } from "react";
// import { createMessage } from "@/utils/api";
// import { useAuth } from "@/context/AuthContext";

// interface MessageFormProps {
//   receiverId: number;
//   tradeId?: number;
//   onMessageSent?: () => void;
// }

// const MessageForm: React.FC<MessageFormProps> = ({
//   receiverId,
//   tradeId,
//   onMessageSent,
// }) => {
//   const [content, setContent] = useState("");
//   const { userId } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await createMessage({
//         senderId: userId,
//         receiverId,
//         content,
//         tradeId,
//       });
//       setContent("");
//       if (onMessageSent) onMessageSent();
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-4">
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded mb-2"
//         placeholder="Write a message..."
//       />
//       <button type="submit" className="btn btn-primary">
//         Send Message
//       </button>
//     </form>
//   );
// };

// export default MessageForm;
