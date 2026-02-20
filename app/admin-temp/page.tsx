"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [date, setDate] = useState("");
  const [temps, setTemps] = useState("");
  const [equipeA, setEquipeA] = useState("");
  const [equipeB, setEquipeB] = useState("");
  const [prediction, setPrediction] = useState("");
  const [isVip, setIsVip] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMatch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("matchs").insert([
      {
        date: date,
        temps: temps,
        équipes: equipeA,
        équipeb: equipeB,
        prédiction: prediction,
        isvip: isVip,
      },
    ]);

    if (error) {
      console.log(error);
      setMessage("❌ " + error.message);
    } else {
      setMessage("✅ Match ajouté !");
      setDate("");
      setTemps("");
      setEquipeA("");
      setEquipeB("");
      setPrediction("");
      setIsVip(false);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Panneau Admin
        </h1>

        <form onSubmit={handleAddMatch} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 rounded-lg bg-zinc-800"
            required
          />

          <input
            type="text"
            placeholder="Heure"
            value={temps}
            onChange={(e) => setTemps(e.target.value)}
            className="p-3 rounded-lg bg-zinc-800"
            required
          />

          <input
            type="text"
            placeholder="Equipe A"
            value={equipeA}
            onChange={(e) => setEquipeA(e.target.value)}
            className="p-3 rounded-lg bg-zinc-800"
            required
          />

          <input
            type="text"
            placeholder="Equipe B"
            value={equipeB}
            onChange={(e) => setEquipeB(e.target.value)}
            className="p-3 rounded-lg bg-zinc-800"
            required
          />

          <input
            type="text"
            placeholder="Prédiction"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            className="p-3 rounded-lg bg-zinc-800"
            required
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isVip}
              onChange={(e) => setIsVip(e.target.checked)}
            />
            Match VIP
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            {loading ? "Ajout..." : "Ajouter le match"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}
      </div>
    </main>
  );
}