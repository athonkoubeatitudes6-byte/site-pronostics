"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-10">
        Tableau de bord
      </h1>

      <div className="grid gap-6 w-full max-w-md">
        {/* Matchs gratuits */}
        <Link
          href="/gratuit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-xl text-center transition"
        >
          Matchs gratuits
        </Link>

        {/* Matchs VIP */}
        <Link
          href="/vip"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          Matchs VIP
        </Link>

        {/* Historique */}
        <Link
          href="/historique"
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          Historique
        </Link>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition"
        >
          Se déconnecter
        </button>
      </div>
     {/* Bouton admin discret */}
<div className="fixed bottom-4 right-4">
  <button
    onClick={() => (window.location.href = "/admin")}
    className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700 transition"
  >
    ⚙ Admin
  </button>
</div>
 
    </div>
  );
}
