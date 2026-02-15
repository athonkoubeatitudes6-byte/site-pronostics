"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();

      const userEmail = data.user?.email || null;
      setEmail(userEmail);

      // 👉 remplace par TON email Google admin
      const ADMIN_EMAIL = "beatitudeathonkou7@gmail.com";

      if (!userEmail) {
        router.push("/login");
        return;
      }

      if (userEmail !== ADMIN_EMAIL) {
        router.push("/dashboard");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Vérification admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        👑 Panneau Admin
      </h1>

      <p className="text-gray-300 mb-8">
        Connecté en tant que : {email}
      </p>

      <div className="grid gap-4 max-w-md">
        <button
          onClick={() => router.push("/admin/ajouter-match")}
          className="bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400"
        >
          ➕ Ajouter un match
        </button>

        <button
          onClick={() => router.push("/historique")}
          className="bg-zinc-800 py-3 rounded-lg font-semibold hover:bg-zinc-700"
        >
          📊 Voir historique
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-zinc-800 py-3 rounded-lg font-semibold hover:bg-zinc-700"
        >
          ⬅ Retour dashboard
        </button>
      </div>
    </div>
  );
}
