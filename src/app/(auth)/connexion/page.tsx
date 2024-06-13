"use client";

// pages/connexion.js
// src/app/auth/connexion/page.tsx

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function Connexion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset the error message on new submit

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password_user: password }),
      });

      if (response.status !== 200) {
        const data = await response.json();
        throw new Error(data.message || `HTTP status ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful", data);
      // Save the token in localStorage
      localStorage.setItem("token", data.token);
      router.push("/profil"); // Redirect to a dashboard or home page after login
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage(error.message); // Set the error message to display
    }
  };

  return (
    <div>
      <Header />
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

// "use client";

// // pages/connexion.js
// // src/app/auth/connexion/page.tsx

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Connexion() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage(""); // Reset the error message on new submit

//     try {
//       const response = await fetch("http://localhost:5000/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password_user: password }),
//       });

//       if (response.status !== 200) {
//         const data = await response.json();
//         throw new Error(data.message || `HTTP status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Login successful", data);
//       router.push("/Home"); // Redirect to a dashboard or home page after login
//     } catch (error) {
//       console.error("Login failed", error);
//       setErrorMessage(error.message); // Set the error message to display
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
//       <div className="w-full max-w-xs">
//         <form
//           className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//           onSubmit={handleSubmit}
//         >
//           {errorMessage && (
//             <div className="mb-4 text-red-500 text-sm text-center">
//               {errorMessage}
//             </div>
//           )}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="username"
//             >
//               Nom d'utilisateur
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="username"
//               type="text"
//               placeholder="Nom d'utilisateur"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="password"
//             >
//               Mot de passe
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="******************"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Connexion
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Corrigez l'import pour 'next/router'
// import styles from "@/app/Home.module.css";

// export default function Connexion() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (event: { preventDefault: () => void }) => {
//     event.preventDefault();
//     setErrorMessage(""); // Réinitialiser le message d'erreur à chaque soumission // Reset error message on new submission

//     try {
//       const response = await fetch("http://localhost:5000/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password_user: password,
//         }),
//       });

//       const data = await response.json();
//       console.log(data);
//       if (!response.ok) {
//         throw new Error(data.message || `HTTP status ${response.status}`);
//       }

//       console.log("Connexion réussie", data);
//       router.push("/ui/Home"); // Redirigez vers une page de dashboard ou une autre route selon votre logique d'application
//     } catch (error) {
//       console.error("Échec de la connexion", error);
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
//       <div className="w-full max-w-xs">
//         <form
//           className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//           onSubmit={handleSubmit}
//         >
//           {errorMessage && (
//             <div className="mb-4 text-red-500 text-sm text-center">
//               {errorMessage}
//             </div>
//           )}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="username"
//             >
//               Nom d'utilisateur
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="username"
//               type="text"
//               placeholder="Nom d'utilisateur"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="password"
//             >
//               Mot de passe
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="******************"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button type="submit" className={styles.buttonLink}>
//               Connexion
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
