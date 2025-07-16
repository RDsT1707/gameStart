"use client";


import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/account");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Connexion à GameStart</h1>
      <button
        onClick={() => signIn("google")}
        className="bg-red-600 text-white px-6 py-2 rounded mb-4 hover:bg-red-700"
      >
        Se connecter avec Google
      </button>
      <button
        onClick={() => signIn("facebook")}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Se connecter avec Facebook
      </button>
    </div>
  );
}
