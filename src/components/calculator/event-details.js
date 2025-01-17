"use client";
import { useEffect, useState } from "react";
import { EventForm } from "./event-form";
import { DrinkSelections } from "./drink-selection";
export const EventDetails = () => {
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
    // if avgNumDrinks has a value and redWineAverage is ""
    if (avgNumDrinks && redWineAverage === "") {
      setRedWineAverage(avgNumDrinks);
    }
  }, [avgNumDrinks, redWineAverage]);

  const drinksNeeded =
    (numGuests || 0) * (avgNumDrinks || 0) * (eventHours || 0);

  const redWineNeeded = Math.ceil(
    ((redWinePercentage / 100.0) * numGuests * redWineAverage * eventHours) / 5
  );
  return (
    <section
      id="event-details"
      className="flex flex-col font-[family-name:var(--chakra)] bg-emerald-50 opacity-75 p-10 mt-1 rounded"
    >
      <EventForm
        eventHours={eventHours}
        setEventHours={setEventHours}
        avgNumDrinks={avgNumDrinks}
        setAvgNumDrinks={setAvgNumDrinks}
        numGuests={numGuests}
        setNumGuests={setNumGuests}
      />
      {drinksNeeded > 0 && (
        <div>
          <p className="flex justify-self-center m-4 text-lg">
            You&apos;re going to need {drinksNeeded} drinks
          </p>
          <section id="drink-details">
            <h4 className="mb-1">Which beverages would you like to serve?</h4>
            <DrinkSelections
              selectedDrinks={selectedDrinks}
              setSelectedDrinks={setSelectedDrinks}
            />
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
                    On average, how many glasses of red wine will a guest have
                    per hour?
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
  );
};
