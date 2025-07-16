"use client";

import React, { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <input
      type="text"
      placeholder="RECHERCHER VOTRE JEU"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full py-2 px-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-orange"
    />
  );
}
