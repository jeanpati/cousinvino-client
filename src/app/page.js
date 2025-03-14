import { EventDetails } from "@/components/calculator/event-details";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-w-screen items-center justify-center px-4">
      <header className="flex flex-col items-center pt-4">
        <h1 className="text-center text-4xl/loose font-[family-name:var(--playwrite)]">
          Cousin Vino&apos;s drink calculator
        </h1>
        <Image
          src="/images/champagne-1920px.webp"
          alt="champagne bottle logo"
          width={200}
          height={150}
          loading="eager"
          priority
        />

        <h2 className="text-center max-w-[60rem] text-xl md:text-2xl font-[family-name:var(--zen)] mr-2 ml-2">
          Easily calculate how many drinks to buy for your event with Cousin
          Vino&apos;s drink calculator. Perfect for parties, weddings, and
          gatherings!
        </h2>
      </header>
      <span className=" bg-[url(/images/purpleline-2500px.webp)] bg-cover h-[2rem] md:h-[4rem]  container bg-center"></span>
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
