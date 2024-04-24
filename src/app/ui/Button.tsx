"use client";

import React from "react";

export default function Button() {
  return (
    <button class="bg-indigo-500" onClick={() => alert("salut")}>
      {" "}
      Dire bonjour
    </button>
  );
}
