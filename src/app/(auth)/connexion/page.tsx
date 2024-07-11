// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import Header from "@/components/PublicHeader";

// export default function Connexion() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage(""); // Reset the error message on new submit

//     try {
//       console.log("Submitting login form", { username, password });
//       await login(username, password);
//       router.push("/profil"); // Redirect to a dashboard or home page after login
//     } catch (error) {
//       console.error("Login failed", error);
//       setErrorMessage((error as Error).message); // Set the error message to display
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
//         <div className="w-full max-w-xs">
//           <form
//             className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//             onSubmit={handleSubmit}
//           >
//             {errorMessage && (
//               <div className="mb-4 text-red-500 text-sm text-center">
//                 {errorMessage}
//               </div>
//             )}
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="username"
//               >
//                 Nom d'utilisateur
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="username"
//                 type="text"
//                 placeholder="Nom d'utilisateur"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="password"
//               >
//                 Mot de passe
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                 id="password"
//                 type="password"
//                 placeholder="******************"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 type="submit"
//                 className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Connexion
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Connexion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset the error message on new submit

    try {
      console.log("Submitting login form", { username, password });
      await login(username, password);
      router.push("/profil"); // Redirect to a dashboard or home page after login
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage((error as Error).message); // Set the error message to display
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Nom d'utilisateur
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              >
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
