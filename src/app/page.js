import { EventDetails } from "@/components/calculator/event-details";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Cousin Vino&apos;s drink calculator</title>
      </Head>

      <header className="flex flex-col items-center pt-3">
        <h1 className="text-4xl/loose font-[family-name:var(--playwrite)]">
          Cousin Vino&apos;s drink calculator
        </h1>
        <div className="flex">
          <Image
            src="/images/champagne.webp"
            alt="champagne"
            width={250}
            height={250}
            loading="eager"
          />
        </div>
        <h2 className="text-xl font-[family-name:var(--chakra)] mr-2 ml-2">
          A handy dandy calculator to help you figure out how many drinks to
          buy!
        </h2>
        <span className=" bg-[url(/images/purpleline.webp)] bg-cover h-[3rem] container bg-center pt-[4rem]"></span>
      </header>
      <main>
        <EventDetails />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div className="text-xl font-[family-name:var(--playwrite)]">
          Planning is fun!
        </div>
      </footer>
    </div>
  );
}
