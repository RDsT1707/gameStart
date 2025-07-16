"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Chargement...</p>;

  if (session) {
    return (
      <div className="text-white">
        Bonjour, {session.user?.name} 👋
        <button
          onClick={() => signOut()}
          className="ml-4 text-sm bg-red-600 px-2 py-1 rounded"
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="text-sm bg-orange-500 px-2 py-1 rounded text-white"
    >
      Se connecter
    </button>
  );
}
