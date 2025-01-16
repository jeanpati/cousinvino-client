"use client";
import { useState } from "react";

export default function Home() {
  const [eventHours, setEventHours] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [avgNumDrinks, setAvgNumDrinks] = useState("");

  const handleEventHoursChange = (e) => {
    if (e.target.value >= 0) {
      setEventHours(Number(e.target.value));
    }
  };
  const handleNumGuestsChange = (e) => {
    if (e.target.value >= 0) {
      setNumGuests(Number(e.target.value));
    }
  };
  const handleAveNumDrinksChange = (e) => {
    if (e.target.value >= 0) {
      setAvgNumDrinks(Number(e.target.value));
    }
  };

  const drinksNeeded =
    (numGuests || 0) * (avgNumDrinks || 0) * (eventHours || 0);

  return (
    <div className="grid grid-rows-3 items-center justify-items-center min-h-screen">
      <header className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-6xl font-[family-name:var(--playwrite)]">
          Cousin Vino&apos;s drink calculator
        </h1>
        <h2 className="text-3xl font-[family-name:var(--chakra)]">
          A handy dandy calculator to help you figure out how much alcohol to
          buy!
        </h2>
      </header>
      <main>
        <h3 className="text-xl font-[family-name:var(--playwrite)]">
          Event Details
        </h3>

        <section className="flex flex-col font-[family-name:var(--chakra)] bg-emerald-50 opacity-75 p-10 m-1 rounded">
          <label htmlFor="event-hours">
            How long is your event? (hours)
            <input
              id="event-hours"
              type="number"
              step="any"
              value={eventHours}
              onChange={handleEventHoursChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label htmlFor="num-of-guests">
            How many guests will be drinking?
            <input
              id="num-of-guests"
              type="number"
              step="any"
              value={numGuests}
              onChange={handleNumGuestsChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label htmlFor="avg-drinks">
            On average, how many drinks will one guest have per hour?
            <input
              id="avg-drinks"
              type="number"
              step="any"
              value={avgNumDrinks}
              onChange={handleAveNumDrinksChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          {drinksNeeded > 0 && (
            <p className="flex self-center mt-4 text-lg">
              You&apos;re going to need {drinksNeeded} drinks
            </p>
          )}
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>FOOTER</div>
      </footer>
    </div>
  );
}
