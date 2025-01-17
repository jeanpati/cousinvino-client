"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [eventHours, setEventHours] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [avgNumDrinks, setAvgNumDrinks] = useState("");
  const [selectedDrinks, setSelectedDrinks] = useState({
    redWine: false,
    whiteWine: false,
    sparklingWine: false,
    beer: false,
    seltzer: false,
  });
  const [redWinePercentage, setRedWinePercentage] = useState("");
  const [redWineAverage, setRedWineAverage] = useState("");

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
  const handleRedWinePercentageChange = (e) => {
    if (e.target.value >= 0) {
      setRedWinePercentage(Number(e.target.value));
    }
  };
  const handleRedWineAverageChange = (e) => {
    if (e.target.value >= 0) {
      setRedWineAverage(Number(e.target.value));
    }
  };

  useEffect(() => {
    setRedWineAverage(avgNumDrinks);
  }, [avgNumDrinks]);

  const drinksNeeded =
    (numGuests || 0) * (avgNumDrinks || 0) * (eventHours || 0);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDrinks((prevState) => ({ ...prevState, [name]: checked }));
  };

  const redWineNeeded = Math.ceil(
    ((redWinePercentage / 100.0) * numGuests * redWineAverage * eventHours) / 5
  );

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
        <h3 className="text-3xl font-[family-name:var(--playwrite)]">
          Event Details
        </h3>

        <section
          id="event-details"
          className="flex flex-col font-[family-name:var(--chakra)] bg-emerald-50 opacity-75 p-10 mt-1 rounded"
        >
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
            <div>
              <p className="flex justify-self-center m-4 text-lg">
                You&apos;re going to need {drinksNeeded} drinks
              </p>
              <section id="drink-details">
                <h4 className="mb-1">
                  Which beverages would you like to serve?
                </h4>
                <div
                  id="drink-options"
                  className="grid grid-rows-3 grid-flow-col gap-2"
                >
                  <label>
                    Red Wine
                    <input
                      type="checkbox"
                      className="ml-1 border border-emerald-500 rounded"
                      name="redWine"
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label>
                    White Wine
                    <input
                      type="checkbox"
                      className="ml-1 border border-emerald-500 rounded"
                      name="redWine"
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label>
                    Sparkling Wine
                    <input
                      type="checkbox"
                      className="ml-1 border border-emerald-500 rounded"
                      name="redWine"
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label>
                    Beer
                    <input
                      type="checkbox"
                      className="ml-1 border border-emerald-500 rounded"
                      name="redWine"
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label>
                    Seltzers
                    <input
                      type="checkbox"
                      className="ml-1 border border-emerald-500 rounded"
                      name="redWine"
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
                <div id="drink-questions" className="mt-5">
                  {selectedDrinks.redWine && (
                    <div className="flex flex-col">
                      <label>
                        What percentage of guests will drink red wine?
                        <input
                          id="red-wine-percentage"
                          type="number"
                          step="any"
                          value={redWinePercentage}
                          onChange={handleRedWinePercentageChange}
                          className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
                        />
                      </label>
                      <label>
                        On average, how many glasses of red wine will a guest
                        have per hour?
                        <input
                          id="red-wine-average"
                          type="number"
                          step="any"
                          value={redWineAverage}
                          onChange={handleRedWineAverageChange}
                          className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
                        />
                      </label>
                      {redWineNeeded > 0 && (
                        <p>
                          You need {redWineNeeded} bottles! (Serves{" "}
                          {redWineNeeded * 5} glasses.)
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>FOOTER</div>
      </footer>
    </div>
  );
}
