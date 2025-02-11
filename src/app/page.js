import { EventDetails } from "@/components/calculator/event-details";
import Head from "next/head";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center mt-3">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Cousin Vino&apos;s drink calculator</title>
      </Head>
      <header className="flex flex-col items-center  bg-white outline outline-black rounded-full outline-[5px] p-8">
        <h1 className="text-3xl/loose font-[family-name:var(--playwrite)]">
          Cousin Vino&apos;s drink calculator
        </h1>
        <h2 className="text-xl font-[family-name:var(--chakra)] mr-2 ml-2">
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
      <footer className="mt-3">
        <div className="text-md/loose font-[family-name:var(--playwrite)]">
          Planning is fun!
        </div>
      </footer>
    </div>
  );
}
