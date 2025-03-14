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
    whiskey: false,
    tequila: false,
    vodka: false,
    gin: false,
    rum: false,
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
      size: 0,
      locked: false,
    },
    hardSeltzers: {
      name: "Hard Seltzers",
      percentage: 0,
      average: 0,
      needed: 0,
      size: 0,
      locked: false,
    },
    whiskey: {
      name: "Whiskey",
      type: "spirit",
      percentage: 0,
      average: 0,
      amountPerDrink: 0,
      needed: 0,
      size: 0,
      locked: false,
    },
    tequila: {
      name: "Tequila",
      type: "spirit",
      percentage: 0,
      average: 0,
      amountPerDrink: 0,
      needed: 0,
      size: 0,
      locked: false,
    },
    vodka: {
      name: "Vodka",
      type: "spirit",
      percentage: 0,
      average: 0,
      amountPerDrink: 0,
      needed: 0,
      size: 0,
      locked: false,
    },
    gin: {
      name: "Gin",
      type: "spirit",
      percentage: 0,
      average: 0,
      amountPerDrink: 0,
      needed: 0,
      size: 0,
      locked: false,
    },
    rum: {
      name: "Rum",
      type: "spirit",
      percentage: 0,
      average: 0,
      amountPerDrink: 0,
      needed: 0,
      size: 0,
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
            size: 0,
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
            average: Number(avgNumDrinks),
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
      className="flex flex-col font-[family-name:var(--zen)] min-w-screen h-auto"
    >
      <div>
        <div
          id="details-selection-wrapper"
          className="flex flex-col justify-around md:flex-row "
        >
          <div
            id="event-details-wrapper"
            className="flex justify-center content-center p-8"
          >
            <section id="event-details" className="flex justify-center">
              <div className="flex flex-col justify-center items-center rounded-2xl shadow-lg outline outline-black/5 p-5 min-w-[20rem]">
                <EventForm
                  eventHours={eventHours}
                  setEventHours={setEventHours}
                  avgNumDrinks={avgNumDrinks}
                  setAvgNumDrinks={setAvgNumDrinks}
                  numGuests={numGuests}
                  setNumGuests={setNumGuests}
                />
                {drinksNeeded > 0 && (
                  <div className="flex flex mt-10 ">
                    <p className="text-2xl items-center">
                      You need {drinksNeeded} drinks
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {drinksNeeded > 0 && (
            <div
              id="drink-selection-wrapper"
              className="flex justify-center content-center"
            >
              <section
                id="drink-selection"
                className="flex justify-center items-center rounded-2xl shadow-lg outline outline-black/5 p-5 min-w-[20rem]"
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
          <section id="beverage-details" className="flex flex-col ml-2 mr-2">
            {Object.values(selectedDrinks).some((isTrue) => isTrue) && (
              <div
                id="drink-questions-wrapper"
                className="flex justify-center flex-col mt-1 rounded-2xl content-center min-w-full"
              >
                <div className="flex justify-center">
                  <Image
                    src="/images/blueglasses-1920px.webp"
                    alt="wine glasses"
                    width={300}
                    height={300}
                    loading="lazy"
                  />
                  <Image
                    src="/images/martini-1920px.webp"
                    alt="wine glasses"
                    width={100}
                    height={200}
                    loading="lazy"
                  />
                </div>
                <h4 className="text-2xl mb-3">Beverage Details</h4>
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
              className="flex justify-center flex-col w-full bg-center"
            >
              {(drinks.redWine.needed > 0 ||
                drinks.whiteWine.needed > 0 ||
                drinks.sparklingWine.needed > 0 ||
                drinks.beer.needed > 0 ||
                drinks.hardSeltzers.needed > 0 ||
                drinks.whiskey.needed > 0 ||
                drinks.tequila.needed > 0 ||
                drinks.vodka.needed > 0 ||
                drinks.gin.needed > 0 ||
                drinks.rum.needed > 0) && (
                <div
                  id="results-list-wrapper"
                  className="flex flex-col justify-end w-full"
                >
                  <span className=" bg-[url(/images/greenline1-2500px.webp)] bg-cover h-[3rem] container bg-center mt-[2rem]"></span>
                  <h4 className="text-2xl mb-3">Results</h4>
                  <Results
                    drinks={drinks}
                    selectedDrinks={selectedDrinks}
                    drinksNeeded={drinksNeeded}
                  />
                  <p className="mt-2  text-md md:text-lg">
                    Keep in mind - people drink less as the party goes on
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
};
