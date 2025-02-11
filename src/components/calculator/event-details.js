"use client";
import { useEffect, useState } from "react";
import { EventForm } from "./event-form";
import { DrinkSelections } from "./drink-selection";
import { Results } from "../results/results";
import { PercentageScale } from "./percentage-scale";
import Image from "next/image";

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
    // loop through selectedDrinks - if any are false, set to default values
    Object.keys(selectedDrinks).forEach((drinkType) => {
      if (!selectedDrinks[drinkType]) {
        setDrinks((prevDrinks) => {
          const updatedDrinks = { ...prevDrinks };
          updatedDrinks[drinkType] = {
            ...updatedDrinks[drinkType],
            percentage: 0,
            needed: 0,
            packSize: 0,
            locked: false,
          };
          return updatedDrinks;
        });
      }
    });
  }, [selectedDrinks]);

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
      className="flex flex-col gap-6  opacity-7 p-10 mt-2 rounded font-[family-name:var(--chakra)] w-full"
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
              <div className="flex flex-col bg-[url(/images/purplesq.webp)] bg-cover h-[25rem] w-[30rem] bg-center pt-[5rem] pl-[2rem]">
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
                    <p className="flex mt-10 text-2xl">
                      You need {drinksNeeded} drinks!
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
              <section
                id="drink-selection"
                className="flex justify-center bg-[url(/images/greensq2.webp)] bg-cover h-[25rem] w-[27rem] bg-center p-8 pt-[6rem]"
              >
                <div>
                  <h4 className=" flex text-xl mb-3">
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
          <section id="beverage-details" className="flex flex-col ">
            {Object.values(selectedDrinks).some((isTrue) => isTrue) && (
              <div
                id="drink-questions-wrapper"
                className="flex flex-col  p-5 mt-1 rounded-2xl content-center min-w-[20rem]"
              >
                <div className="flex justify-between">
                  <Image
                    src="/images/blueglasses.webp"
                    alt="wine glasses"
                    width={300}
                    height={300}
                  />
                  <Image
                    src="/images/martini.webp"
                    alt="wine glasses"
                    width={100}
                    height={200}
                  />
                </div>
                <h4 className="text-xl mb-3">Beverage Details</h4>
                <section
                  id="drink-questions"
                  className="flex flex-col bg-yellow-50 p-1 rounded-2xl"
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
            <section
              id="results"
              className="flex flex-col bg-[url(/images/redsq.webp)] bg-cover h-[38rem] w-[59rem] bg-center pt-[6rem]"
            >
              {(drinks.redWine.needed > 0 ||
                drinks.whiteWine.needed > 0 ||
                drinks.sparklingWine.needed > 0 ||
                drinks.beer.needed > 0 ||
                drinks.hardSeltzers.needed > 0) && (
                <div
                  id="results-wrapper"
                  className="flex flex-col p-10 mt-10 rounded-2xl "
                >
                  <h4 className="text-xl mb-3">Results</h4>

                  <section id="results-list">
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
