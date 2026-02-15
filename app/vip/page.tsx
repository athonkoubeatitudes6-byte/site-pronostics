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

export default function VipPage() {
  const [matchs, setMatchs] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchs = async () => {
      const { data, error } = await supabase
        .from("matchs")
        .select("*")
        .eq("type", "vip");

      if (error) {
        console.error("Erreur chargement :", error);
      } else {
        setMatchs(data || []);
      }

      setLoading(false);
    };

    fetchMatchs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-yellow-400 hover:underline">
          ← Retour
        </Link>

        <h1 className="text-3xl font-bold text-yellow-400 text-center">
          Matchs VIP
        </h1>

        <div className="w-16"></div>
      </div>

      {matchs.length === 0 && (
        <p className="text-center text-gray-400">Aucun match VIP</p>
      )}

      <div className="grid gap-6 max-w-2xl mx-auto">
        {matchs.map((match) => (
          <div
            key={match.id}
            className="border border-yellow-500 rounded-xl p-6 bg-black/40 shadow-lg"
          >
            {/* Equipes */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <div className="w-1/3 text-left">{match.equipe1}</div>

              <div className="w-1/3 text-center text-yellow-400 font-bold">
                VS
              </div>

              <div className="w-1/3 text-right">{match.equipe2}</div>
            </div>

            {/* Infos */}
            <div className="mt-5 flex flex-col items-center gap-2 text-gray-300">
              <p className="text-sm">
                📅 {match.date} — 🕒 {match.heure}
              </p>

              <p className="text-base">
                🎯 Pronostic
                <span className="text-yellow-400 font-semibold ml-1">
                  {match.pronostic}
                </span>
              </p>

              {match.cote && (
                <p className="text-green-400 font-semibold">
                  📈 Cote : {match.cote}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
