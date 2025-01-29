"use client";
import { useEffect, useState } from "react";
import { EventForm } from "./event-form";
import { DrinkSelections } from "./drink-selection";
import { RedWineCalculations } from "./red-wine-calc";
import { WhiteWineCalculations } from "./white-wine-calc";
import { SparklingWineCalculations } from "./sparkling-wine-calc";
import { BeerCalculations } from "./beer-calc";
import { SeltzerCalculations } from "./seltzer-calc";
import { Results } from "../results/results";

import { PercentageScale } from "./percentage-scale";

export const EventDetails = () => {
  const [eventHours, setEventHours] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [avgNumDrinks, setAvgNumDrinks] = useState("");
  const [selectedDrinks, setSelectedDrinks] = useState({
    redWine: false,
    whiteWine: false,
    sparklingWine: false,
    beer: false,
    hardSeltzers: false,
  });

  const [drinks, setDrinks] = useState({
    redWine: { name: "Red Wine", percentage: "", average: "", needed: "" },
    whiteWine: { name: "White Wine", percentage: "", average: "", needed: "" },
    sparklingWine: {
      name: "Sparkling Wine",
      percentage: "",
      average: "",
      needed: "",
    },
    beer: {
      name: "Beer",
      percentage: "",
      average: "",
      needed: "",
      packSize: "",
    },
    hardSeltzers: {
      name: "Hard Seltzers",
      percentage: "",
      average: "",
      needed: "",
      packSize: "",
    },
  });

  useEffect(() => {
    // if avgNumDrinks has a value and redWineAverage is ""
    if (avgNumDrinks && drinks.redWine.average === "") {
      updateDrink("redWine", "average", avgNumDrinks);
    }
  }, [avgNumDrinks, drinks]);

  const drinksNeeded =
    (numGuests || 0) * (avgNumDrinks || 0) * (eventHours || 0);

  const updateDrink = (drinkType, key, value) => {
    setDrinks((prev) => ({
      ...prev,
      [drinkType]: {
        ...prev[drinkType],
        [key]: value,
      },
    }));
  };

  return (
    <div
      id="main-wrapper"
      className="grid grid-cols-1  md:grid-rows-2 gap-6 bg-teal-100 opacity-7 p-10 mt-2 rounded font-[family-name:var(--chakra)]"
    >
      <div
        id="event-form-wrapper"
        className="grid grid-cols-1  md:grid-cols-2 justify-between items-baseline place-content-center bg-red-100 opacity-7 rounded p-10"
      >
        <section id="event-details">
          <h4 className="text-xl">
            Let&apos;s calculate how many drinks you&apos;ll need
          </h4>
          <div className="flex flex-col bg-emerald-50  p-3 mr-5 rounded">
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
                <p className="flex justify-self-center m-4 text-xl">
                  You&apos;re going to need {drinksNeeded} drinks
                </p>
              </div>
            )}
          </div>
        </section>
        <section id="drink-selection" className="mt-3">
          {drinksNeeded > 0 && (
            <div id="drink-selection-wrapper">
              <h4 className="text-xl">
                Which beverages would you like to serve?
              </h4>
              <div className="flex flex-col bg-emerald-50 p-3 rounded">
                <DrinkSelections setSelectedDrinks={setSelectedDrinks} />
              </div>
            </div>
          )}
        </section>
      </div>

      <div>
        <section id="drink-details" className="flex flex-col">
          {Object.values(selectedDrinks).some((isTrue) => isTrue) && (
            <div
              id="drink-questions-wrapper"
              className="flex flex-col bg-yellow-100 p-10 mt-1 rounded"
            >
              <h4 className="text-xl">Beverage Percentages</h4>
              <section
                id="drink-questions"
                className="flex flex-col bg-emerald-50 p-10 mt-5 rounded"
              >
                <PercentageScale
                  selectedDrinks={selectedDrinks}
                  setDrinks={setDrinks}
                  drinks={drinks}
                />
                <RedWineCalculations
                  selectedDrinks={selectedDrinks}
                  drinks={drinks}
                  updateDrink={updateDrink}
                  numGuests={numGuests}
                  eventHours={eventHours}
                />
                <WhiteWineCalculations
                  selectedDrinks={selectedDrinks}
                  drinks={drinks}
                  updateDrink={updateDrink}
                  numGuests={numGuests}
                  eventHours={eventHours}
                />
                <SparklingWineCalculations
                  selectedDrinks={selectedDrinks}
                  drinks={drinks}
                  updateDrink={updateDrink}
                  numGuests={numGuests}
                  eventHours={eventHours}
                />
                <BeerCalculations
                  selectedDrinks={selectedDrinks}
                  drinks={drinks}
                  updateDrink={updateDrink}
                  numGuests={numGuests}
                  eventHours={eventHours}
                />
                <SeltzerCalculations
                  selectedDrinks={selectedDrinks}
                  drinks={drinks}
                  updateDrink={updateDrink}
                  numGuests={numGuests}
                  eventHours={eventHours}
                />
              </section>
            </div>
          )}
        </section>
        {Object.values(selectedDrinks).some((isTrue) => isTrue) && (
          <section id="results" className="flex flex-col">
            {(drinks.redWine.needed > 0 ||
              drinks.whiteWine.needed > 0 ||
              drinks.sparklingWine.needed > 0 ||
              drinks.beer.needed > 0 ||
              drinks.hardSeltzers.needed > 0) && (
              <div
                id="results-wrapper"
                className="flex flex-col bg-red-100  p-10 mt-1 rounded"
              >
                <h4 className="text-xl">Results</h4>

                <section
                  id="results-list"
                  className="flex flex-col bg-emerald-50  p-10 mt-1 rounded"
                >
                  <Results drinks={drinks} selectedDrinks={selectedDrinks} />
                </section>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
