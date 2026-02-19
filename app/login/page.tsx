"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // ✅ Vérifie si déjà connecté
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.replace("/dashboard");
      }
    };

    checkUser();
  }, [router]);

  // ✅ Connexion Google
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>

        <button
          onClick={handleLogin}
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
        >
          Se connecter avec Google
        </button>
      </div>
    </main>
  );
}