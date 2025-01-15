export default function Home() {
  return (
    <div className="grid grid-rows-3 items-center justify-items-center min-h-screen">
      <header className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-6xl font-[family-name:var(--playwrite)]">
          cousin vino&apos;s drink calculator
        </h1>
        <h2 className="text-3xl font-[family-name:var(--chakra)]">
          a handy dandy calculator to help you figure out how much alcohol to
          buy
        </h2>
      </header>
      <main>
        <h3 className="text-xl font-[family-name:var(--playwrite)]">
          Event Details
        </h3>

        <section className="flex flex-col font-[family-name:var(--chakra)]">
          <label>
            How long is your event? (hours)
            <input className="ml-1 mt-1 border border-emerald-500 p-2 rounded" />
          </label>
          <label>
            How many guests will be drinking?
            <input className="ml-1 mt-1 border border-emerald-500 p-2 rounded" />
          </label>
          <label>
            On average, how many drinks will one guest have per hour?
            <input className="ml-1 mt-1 border border-emerald-500 p-2 rounded" />
          </label>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>FOOTER</div>
      </footer>
    </div>
  );
}
