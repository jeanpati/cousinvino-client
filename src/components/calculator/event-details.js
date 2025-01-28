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
import {
  calculateCannedBeverages,
  calculateSparklingWine750ml,
  calculateStillWine750ml,
} from "../utils/calculations";
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
  const [redWineNeeded, setRedWineNeeded] = useState("");
  const [whiteWineNeeded, setWhiteWineNeeded] = useState("");
  const [sparklingWineNeeded, setSparklingWineNeeded] = useState("");
  const [beerNeeded, setBeerNeeded] = useState("");
  const [seltzerNeeded, setSeltzerNeeded] = useState("");

  useEffect(() => {
    // if avgNumDrinks has a value and redWineAverage is ""
    if (avgNumDrinks && redWineAverage === "") {
      setRedWineAverage(avgNumDrinks);
    }
  }, [avgNumDrinks, redWineAverage]);

  const drinksNeeded =
    (numGuests || 0) * (avgNumDrinks || 0) * (eventHours || 0);

  useEffect(() => {
    setRedWineNeeded(
      calculateStillWine750ml(
        redWinePercentage,
        numGuests,
        redWineAverage,
        eventHours
      )
    );
  }, [redWinePercentage, eventHours, numGuests, redWineAverage]);

  useEffect(() => {
    setWhiteWineNeeded(
      calculateStillWine750ml(
        whiteWinePercentage,
        numGuests,
        whiteWineAverage,
        eventHours
      )
    );
  }, [whiteWineAverage, eventHours, numGuests, whiteWinePercentage]);

  useEffect(() => {
    setSparklingWineNeeded(
      calculateSparklingWine750ml(
        sparklingWinePercentage,
        numGuests,
        sparklingWineAverage,
        eventHours
      )
    );
  }, [sparklingWineAverage, eventHours, numGuests, sparklingWinePercentage]);

  useEffect(() => {
    setBeerNeeded(
      calculateCannedBeverages(
        beerPercentage,
        numGuests,
        beerAverage,
        eventHours,
        beerPackSize
      )
    );
  }, [beerPercentage, eventHours, numGuests, beerAverage, beerPackSize]);

  useEffect(() => {
    setSeltzerNeeded(
      calculateCannedBeverages(
        seltzerPercentage,
        numGuests,
        seltzerAverage,
        eventHours,
        seltzerPackSize
      )
    );
  }, [
    seltzerPercentage,
    eventHours,
    numGuests,
    seltzerAverage,
    seltzerPackSize,
  ]);

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
                  setRedWinePercentage={setRedWinePercentage}
                  setWhiteWinePercentage={setWhiteWinePercentage}
                  setSparklingWinePercentage={setSparklingWinePercentage}
                  setBeerPercentage={setBeerPercentage}
                  setSeltzerPercentage={setSeltzerPercentage}
                />
                <RedWineCalculations
                  selectedDrinks={selectedDrinks}
                  setRedWineAverage={setRedWineAverage}
                  redWineAverage={redWineAverage}
                  setRedWinePercentage={setRedWinePercentage}
                  redWinePercentage={redWinePercentage}
                />
                <WhiteWineCalculations
                  selectedDrinks={selectedDrinks}
                  setWhiteWineAverage={setWhiteWineAverage}
                  whiteWineAverage={whiteWineAverage}
                  setWhiteWinePercentage={setWhiteWinePercentage}
                  whiteWinePercentage={whiteWinePercentage}
                />
                <SparklingWineCalculations
                  selectedDrinks={selectedDrinks}
                  setSparklingWineAverage={setSparklingWineAverage}
                  sparklingWineAverage={sparklingWineAverage}
                  setSparklingWinePercentage={setSparklingWinePercentage}
                  sparklingWinePercentage={sparklingWinePercentage}
                />
                <BeerCalculations
                  selectedDrinks={selectedDrinks}
                  setBeerAverage={setBeerAverage}
                  beerAverage={beerAverage}
                  setBeerPercentage={setBeerPercentage}
                  beerPercentage={beerPercentage}
                  setBeerPackSize={setBeerPackSize}
                />
                <SeltzerCalculations
                  selectedDrinks={selectedDrinks}
                  setSeltzerAverage={setSeltzerAverage}
                  seltzerAverage={seltzerAverage}
                  setSeltzerPercentage={setSeltzerPercentage}
                  seltzerPercentage={seltzerPercentage}
                  setSeltzerPackSize={setSeltzerPackSize}
                />
              </section>
            </div>
          )}
        </section>
        {Object.values(selectedDrinks).some((isTrue) => isTrue) && (
          <section id="results" className="flex flex-col">
            {(redWineNeeded > 0 ||
              whiteWineNeeded > 0 ||
              sparklingWineNeeded > 0 ||
              beerNeeded > 0 ||
              seltzerNeeded > 0) && (
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
                    redWineNeeded={redWineNeeded}
                    whiteWineNeeded={whiteWineNeeded}
                    sparklingWineNeeded={sparklingWineNeeded}
                    beerNeeded={beerNeeded}
                    beerPackSize={beerPackSize}
                    seltzerNeeded={seltzerNeeded}
                    seltzerPackSize={seltzerPackSize}
                    selectedDrinks={selectedDrinks}
                  />
                </section>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
