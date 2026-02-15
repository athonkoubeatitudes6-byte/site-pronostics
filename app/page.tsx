export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          ⚽ Pronostics Football Fiables
        </h1>

        <p className="text-gray-300 max-w-2xl mb-8 text-lg">
          Reçois chaque jour des pronostics analysés avec statistiques,
          gestion de bankroll et accès VIP pour maximiser tes gains.
        </p>

        <div className="flex gap-4">
          <a
            href="/gratuit"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition"
          >
            Voir les pronostics gratuits
          </a>

          <a
            href="/vip"
            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Accès VIP
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 px-6 pb-24 max-w-6xl mx-auto">
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">📊 Analyses précises</h3>
          <p className="text-gray-400">
            Chaque pari est basé sur des statistiques et la forme des équipes.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">💸 Gestion bankroll</h3>
          <p className="text-gray-400">
            Conseils de mise pour éviter les pertes et progresser régulièrement.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">👑 Espace VIP</h3>
          <p className="text-gray-400">
            Accès à des pronostics premium à forte valeur.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 pb-8">
        © {new Date().getFullYear()} Pronostics Pro — Tous droits réservés
      </footer>
    </main>
  );
}
