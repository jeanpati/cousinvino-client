"use client";
import { useEffect, useState } from "react";
import { EventForm } from "./event-form";
import { DrinkSelections } from "./drink-selection";
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
    redWine: {
      name: "Red Wine",
      percentage: 0,
      average: 0,
      needed: 0,
      locked: false,
    },
    whiteWine: {
      name: "White Wine",
      percentage: 0,
      average: 0,
      needed: 0,
      locked: false,
    },
    sparklingWine: {
      name: "Sparkling Wine",
      percentage: 0,
      average: 0,
      needed: 0,
      locked: false,
    },
    beer: {
      name: "Beer",
      percentage: 0,
      average: 0,
      needed: 0,
      packSize: 0,
      locked: false,
    },
    hardSeltzers: {
      name: "Hard Seltzers",
      percentage: 0,
      average: 0,
      needed: 0,
      packSize: 0,
      locked: false,
    },
  });

  useEffect(() => {
    if (avgNumDrinks) {
      setDrinks((prevDrinks) => {
        const updatedDrinks = { ...prevDrinks };

        // set the average for all beverages to avgNumDrinks
        Object.keys(updatedDrinks).forEach((drinkType) => {
          updatedDrinks[drinkType] = {
            ...updatedDrinks[drinkType],
            average: avgNumDrinks,
          };
        });

        return updatedDrinks;
      });
    }
  }, [avgNumDrinks]);

  const drinksNeeded =
    (numGuests || 0) * (avgNumDrinks || 0) * (eventHours || 0);

  const updateDrink = (drinkType, key, value) => {
    setDrinks((prevDrinks) => ({
      ...prevDrinks,
      [drinkType]: {
        ...prevDrinks[drinkType],
        [key]: value,
      },
    }));
  };

  return (
    <div
      id="main-wrapper"
      className="flex flex-col gap-6 bg-teal-100 opacity-7 p-10 mt-2 rounded font-[family-name:var(--chakra)] w-full"
    >
      <div>
        <div
          id="details-selection-wrapper"
          className="flex flex-col md:flex-row "
        >
          <div
            id="event-details-wrapper"
            className="circle-bg flex content-center p-8"
          >
            <section id="event-details" className="flex justify-center">
              <div className="flex flex-col ">
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
                    <p className="flex justify-self-center mt-5 text-xl">
                      You&apos;re going to need {drinksNeeded} drinks
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {drinksNeeded > 0 && (
            <div
              id="drink-selection-wrapper"
              className="circle-bg flex content-center"
            >
              <section id="drink-selection" className="flex justify-center p-8">
                <div>
                  <h4 className="text-xl mb-3">
                    Which beverages would you like to serve?
                  </h4>
                  <div>
                    <DrinkSelections
                      setSelectedDrinks={setSelectedDrinks}
                      selectedDrinks={selectedDrinks}
                    />
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
        {drinksNeeded > 0 && (
          <section id="beverage-details" className="flex flex-col">
            {Object.values(selectedDrinks).some((isTrue) => isTrue) && (
              <div
                id="drink-questions-wrapper"
                className="flex flex-col bg-yellow-100 p-1 mt-1 rounded content-center min-w-[20rem]"
              >
                <h4 className="text-xl">Beverage Details</h4>
                <section
                  id="drink-questions"
                  className="flex flex-col bg-emerald-50 p-10 mt-5 rounded-lg"
                >
                  <div
                    id="percentage-scale-wrapper"
                    className="align-center max-w-auto"
                  >
                    <PercentageScale
                      selectedDrinks={selectedDrinks}
                      setDrinks={setDrinks}
                      drinks={drinks}
                      updateDrink={updateDrink}
                      numGuests={numGuests}
                      eventHours={eventHours}
                    />
                  </div>
                </section>
              </div>
            )}
          </section>
        )}
      </div>
      {drinksNeeded > 0 && (
        <div>
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
                    <Results
                      drinks={drinks}
                      selectedDrinks={selectedDrinks}
                      drinksNeeded={drinksNeeded}
                    />
                  </section>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
};
