import { EventDetails } from "@/components/calculator/event-details";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <header className="flex flex-col gap-8 items-center  ">
        <h1 className="text-5xl/loose font-[family-name:var(--playwrite)]">
          Cousin Vino&apos;s drink calculator
        </h1>
        <h2 className="text-3xl font-[family-name:var(--chakra)] mr-2 ml-2">
          A handy dandy calculator to help you figure out how much alcohol to
          buy!
        </h2>
      </header>
      <main>
        <h3 className="text-3xl mt-10 font-[family-name:var(--playwrite)]">
          Event Details
        </h3>
        <EventDetails />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>FOOTER</div>
      </footer>
    </div>
  );
}
