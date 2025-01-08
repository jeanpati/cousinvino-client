export default function Home() {
  return (
    <div className="grid grid-rows-3 items-center justify-items-center min-h-screen">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-6xl font-[family-name:var(--playwrite)]">
          cousin vino's drink calculator
        </h1>
        <h2 className="text-3xl font-[family-name:var(--chakra)]">
          a handy dandy calculator to help you figure out how much alcohol to
          buy
        </h2>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>FOOTER</div>
      </footer>
    </div>
  );
}
