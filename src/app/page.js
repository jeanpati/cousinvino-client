import { EventDetails } from "@/components/calculator/event-details";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-w-screen items-center justify-center px-4">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Cousin Vino&apos;s drink calculator</title>
      </Head>

      <header className="flex flex-col items-center pt-4">
        <h1 className="text-4xl/loose font-[family-name:var(--playwrite)]">
          Cousin Vino&apos;s
        </h1>
        <h1 className="text-4xl/loose font-[family-name:var(--playwrite)]">
          drink calculator
        </h1>
        <Image
          src="/images/champagne.webp"
          alt="champagne"
          width={200}
          height={200}
          loading="eager"
        />

        <h2 className="text-xl md:text-2xl font-[family-name:var(--zen)] mr-2 ml-2">
          Let&apos;s figure out how many drinks to buy!
        </h2>
      </header>
      <span className=" bg-[url(/images/purpleline.webp)] bg-cover h-[2rem] md:h-[4rem]  container bg-center"></span>
      <main>
        <EventDetails />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center m-8">
        <div className="text-xl font-[family-name:var(--playwrite)]">
          Planning is fun!
        </div>
      </footer>
    </div>
  );
}
