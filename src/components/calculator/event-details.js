"use client";
import { useEffect, useState } from "react";
import { EventForm } from "./event-form";
import { DrinkSelections } from "./drink-selection";
import { RedWineCalculations } from "./red-wine-calc";
import { WhiteWineCalculations } from "./white-wine-calc";
import { SparklingWineCalculations } from "./sparkling-wine-calc";
import { BeerCalculations } from "./beer-calc";
import { SeltzerCalculations } from "./seltzer-calc";

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
  const [redWinePercentage, setRedWinePercentage] = useState("");
  const [redWineAverage, setRedWineAverage] = useState("");
  const [whiteWinePercentage, setWhiteWinePercentage] = useState("");
  const [whiteWineAverage, setWhiteWineAverage] = useState("");
  const [sparklingWinePercentage, setSparklingWinePercentage] = useState("");
  const [sparklingWineAverage, setSparklingWineAverage] = useState("");
  const [beerPercentage, setBeerPercentage] = useState("");
  const [beerAverage, setBeerAverage] = useState("");
  const [beerPackSize, setBeerPackSize] = useState("");
  const [seltzerPercentage, setSeltzerPercentage] = useState("");
  const [seltzerAverage, setSeltzerAverage] = useState("");
  const [seltzerPackSize, setSeltzerPackSize] = useState("");

  useEffect(() => {
    // if avgNumDrinks has a value and redWineAverage is ""
    if (avgNumDrinks && redWineAverage === "") {
      setRedWineAverage(avgNumDrinks);
    }
  }, [avgNumDrinks, redWineAverage]);

  const drinksNeeded =
    (numGuests || 0) * (avgNumDrinks || 0) * (eventHours || 0);

  return (
    <div
      id="main-wrapper"
      className="flex flex-col bg-teal-100 opacity-7 p-10 mt-1 rounded"
    >
      <div
        id="event-form-wrapper"
        className="flex flex-col bg-red-100 opacity-7 p-10 mt-1 rounded"
      >
        <h4 className="text-xl font-[family-name:var(--chakra)]">
          Let&apos;s calculate how many drinks you&apos;ll need
        </h4>
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
            </div>
          )}
        </section>
      </div>

      <div>
        <section id="" className="flex flex-col">
          {drinksNeeded > 0 && (
            <div
              id="drink-selection-wrapper"
              className="flex flex-col bg-red-100 opacity-7 p-10 mt-1 rounded"
            >
              <h4 className="text-xl font-[family-name:var(--chakra)]">
                Which beverages would you like to serve?
              </h4>
              <section
                id="drink-selection"
                className="flex flex-col font-[family-name:var(--chakra)] bg-emerald-50 opacity-75 p-10 mt-1 rounded"
              >
                <DrinkSelections setSelectedDrinks={setSelectedDrinks} />
              </section>
            </div>
          )}

          {Object.values(selectedDrinks).some((isTrue) => isTrue) && (
            <div
              id="drink-details-wrapper"
              className="flex flex-col bg-yellow-100 opacity-7 p-10 mt-1 rounded"
            >
              <h4 className="text-xl font-[family-name:var(--chakra)]">
                Beverage Percentages
              </h4>
              <section
                id="drink-details-questions"
                className="flex flex-col font-[family-name:var(--chakra)] bg-emerald-50 opacity-75 p-10 mt-5 rounded"
              >
                <RedWineCalculations
                  selectedDrinks={selectedDrinks}
                  setRedWineAverage={setRedWineAverage}
                  redWineAverage={redWineAverage}
                  setRedWinePercentage={setRedWinePercentage}
                  redWinePercentage={redWinePercentage}
                  numGuests={numGuests}
                  eventHours={eventHours}
                />
                <WhiteWineCalculations
                  selectedDrinks={selectedDrinks}
                  setWhiteWineAverage={setWhiteWineAverage}
                  whiteWineAverage={whiteWineAverage}
                  setWhiteWinePercentage={setWhiteWinePercentage}
                  whiteWinePercentage={whiteWinePercentage}
                  numGuests={numGuests}
                  eventHours={eventHours}
                />
                <SparklingWineCalculations
                  selectedDrinks={selectedDrinks}
                  setSparklingWineAverage={setSparklingWineAverage}
                  sparklingWineAverage={sparklingWineAverage}
                  setSparklingWinePercentage={setSparklingWinePercentage}
                  sparklingWinePercentage={sparklingWinePercentage}
                  numGuests={numGuests}
                  eventHours={eventHours}
                />
                <BeerCalculations
                  selectedDrinks={selectedDrinks}
                  setBeerAverage={setBeerAverage}
                  beerAverage={beerAverage}
                  setBeerPercentage={setBeerPercentage}
                  beerPercentage={beerPercentage}
                  numGuests={numGuests}
                  eventHours={eventHours}
                  beerPackSize={beerPackSize}
                  setBeerPackSize={setBeerPackSize}
                />
                <SeltzerCalculations
                  selectedDrinks={selectedDrinks}
                  setSeltzerAverage={setSeltzerAverage}
                  seltzerAverage={seltzerAverage}
                  setSeltzerPercentage={setSeltzerPercentage}
                  seltzerPercentage={seltzerPercentage}
                  numGuests={numGuests}
                  eventHours={eventHours}
                  seltzerPackSize={seltzerPackSize}
                  setSeltzerPackSize={setSeltzerPackSize}
                />
              </section>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
