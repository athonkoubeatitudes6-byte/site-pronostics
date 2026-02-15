"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Match = {
  id: string;
  equipe1: string;
  equipe2: string;
  date: string;
  heure: string;
  pronostic: string;
  cote: string | null;
  type: string;
};

export default function GratuitPage() {
  const [matchs, setMatchs] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchMatchs = async () => {
      let query = supabase.from("matchs").select("*").eq("type", "free");

      if (selectedDate) {
        query = query.eq("date", selectedDate);
      }

      const { data, error } = await query;

      if (error) console.error(error);
      else setMatchs(data || []);

      setLoading(false);
    };

    fetchMatchs();
  }, [selectedDate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10">
          ← Retour
        </Link>

        <h1 className="text-3xl font-bold text-yellow-400">
          Matchs gratuits
        </h1>

        <div className="w-20"></div>
      </div>

      {/* FILTRE DATE */}
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#111827] border border-white/10"
        />
      </div>

      {matchs.length === 0 && (
        <p className="text-center text-gray-400">Aucun match</p>
      )}

      <div className="grid gap-6 max-w-2xl mx-auto">
        {matchs.map((match) => (
          <div
            key={match.id}
            className="border border-white/10 rounded-xl p-6 bg-[#111827]"
          >
            <div className="flex justify-between font-semibold">
              <span>{match.equipe1}</span>
              <span className="text-yellow-400">VS</span>
              <span>{match.equipe2}</span>
            </div>

            <div className="text-center mt-4 text-gray-300">
              <p>{match.date} • {match.heure}</p>
              <p className="text-yellow-400 font-semibold mt-1">
                {match.pronostic}
              </p>
              {match.cote && (
                <p className="text-green-400">Cote {match.cote}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
