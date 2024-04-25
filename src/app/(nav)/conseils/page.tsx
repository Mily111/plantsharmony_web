"use client";

import React from "react";
import Header from "@/components/Header";

// create function to search data
const getData = async () => {
  const res = await fetch("http://localhost:5000/user");
  const data = await res.json();
  return data;
};

type User = {
  Id_user: number;
  username: string;
  email_user: string;
  password_user: string;
  Id_type_user_rights: number;
};
// put async in export default home :
// eslint-disable-next-line @next/next/no-async-client-component
export default async function Conseils() {
  const user = await getData();

  return (
    <main className="bg-teal-500 text-teal-950">
      <div>
        <Header />
        <div className="container">
          {user.map((user: User) => (
            <div key={user.Id_user} className="carte">
              <h3>{user.username}</h3>
            </div>
          ))}
        </div>
        <button className="btn btn-accent mt-5">Accent</button>
      </div>
    </main>
  );
}
