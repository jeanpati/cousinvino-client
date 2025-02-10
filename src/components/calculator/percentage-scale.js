import { useEffect, useMemo, useState } from "react";
import {
  calculateCannedBeverages,
  calculateSparklingWine750ml,
  calculateStillWine750ml,
} from "../utils/calculations";

export const PercentageScale = ({
  selectedDrinks,
  setDrinks,
  drinks,
  updateDrink,
  numGuests,
  eventHours,
}) => {
  const selectedBeverageKeys = useMemo(
    () => Object.keys(selectedDrinks).filter((drink) => selectedDrinks[drink]),
    [selectedDrinks]
  );

  useEffect(() => {
    if (selectedDrinks.redWine) {
      const redWineNeeded = calculateStillWine750ml(
        drinks.redWine.percentage,
        numGuests,
        drinks.redWine.average,
        eventHours
      );
      updateDrink("redWine", "needed", redWineNeeded);
    }
    if (selectedDrinks.whiteWine) {
      const whiteWineNeeded = calculateStillWine750ml(
        drinks.whiteWine.percentage,
        numGuests,
        drinks.whiteWine.average,
        eventHours
      );
      updateDrink("whiteWine", "needed", whiteWineNeeded);
    }
    if (selectedDrinks.sparklingWine) {
      const sparklingWineNeeded = calculateSparklingWine750ml(
        drinks.sparklingWine.percentage,
        numGuests,
        drinks.sparklingWine.average,
        eventHours
      );
      updateDrink("sparklingWine", "needed", sparklingWineNeeded);
    }
    if (selectedDrinks.beer) {
      const beerNeeded = calculateCannedBeverages(
        drinks.beer.percentage,
        numGuests,
        drinks.beer.average,
        eventHours,
        drinks.beer.packSize
      );
      updateDrink("beer", "needed", beerNeeded);
    }
    if (selectedDrinks.hardSeltzers) {
      const hardSeltzerNeeded = calculateCannedBeverages(
        drinks.hardSeltzers.percentage,
        numGuests,
        drinks.hardSeltzers.average,
        eventHours,
        drinks.hardSeltzers.packSize
      );
      updateDrink("hardSeltzers", "needed", hardSeltzerNeeded);
    }
  }, [
    numGuests,
    eventHours,
    drinks.redWine.percentage,
    drinks.redWine.average,
    drinks.whiteWine.average,
    drinks.whiteWine.percentage,
    drinks.sparklingWine.average,
    drinks.sparklingWine.percentage,
    drinks.beer.average,
    drinks.beer.percentage,
    drinks.hardSeltzers.percentage,
    drinks.hardSeltzers.average,
  ]);

  // initialize percentages equally when checkboxes are clicked
  useEffect(() => {
    if (!selectedBeverageKeys.length) return;

    const equalPercentage = 100 / selectedBeverageKeys.length;
    setDrinks((prevDrinks) => {
      const updatedDrinks = { ...prevDrinks };
      selectedBeverageKeys.forEach((drink) => {
        updatedDrinks[drink] = {
          ...updatedDrinks[drink],
          percentage: equalPercentage,
        };
      });
      Object.keys(prevDrinks).forEach((drink) => {
        if (!selectedDrinks[drink]) {
          updatedDrinks[drink] = { ...updatedDrinks[drink], percentage: 0 };
        }
      });
      return updatedDrinks;
    });
  }, [selectedBeverageKeys, selectedDrinks, setDrinks]);

  if (!selectedBeverageKeys.length) return null;

  // toggle lock state
  const toggleLock = (beverage) => {
    setDrinks((prevDrinks) => ({
      ...prevDrinks,
      [beverage]: {
        ...prevDrinks[beverage],
        locked: !prevDrinks[beverage]?.locked,
      },
    }));
  };

  const handlePercentageChange = (index, newPercentage) => {
    setDrinks((prevDrinks) => {
      // set variables for locked and unlocked beverages
      const lockedBeverages = selectedBeverageKeys.filter(
        (drink) => prevDrinks[drink].locked
      );
      const unlockedBeverages = selectedBeverageKeys.filter(
        (drink) => !prevDrinks[drink].locked
      );

      // if beverages is locked, prevent changes
      if (lockedBeverages.length === selectedBeverageKeys.length) {
        return prevDrinks;
      }

      // loops through locked beverages and add up percentage values
      const lockedTotal = lockedBeverages.reduce(
        (acc, drink) => acc + prevDrinks[drink].percentage,
        0
      );

      // if two out of three beverages are locked, set percentage of the last unlocked beverage
      if (lockedBeverages.length === selectedBeverageKeys.length - 1) {
        const remainingBeverage = unlockedBeverages[0];
        return {
          ...prevDrinks,
          [remainingBeverage]: {
            ...prevDrinks[remainingBeverage],
            percentage: 100 - lockedTotal,
          },
        };
      }

      // set min and max limits for available percentage
      const maxAvailable = 100 - lockedTotal;
      newPercentage = Math.max(0, Math.min(maxAvailable, newPercentage));

      const updatedDrinks = { ...prevDrinks };

      updatedDrinks[selectedBeverageKeys[index]] = {
        ...updatedDrinks[selectedBeverageKeys[index]],
        percentage: newPercentage,
      };

      // distribute the remaining percentage among other unlocked beverages
      const remainingPercentage = maxAvailable - newPercentage;
      const remainingBeverages = unlockedBeverages.filter(
        (bev) => bev !== selectedBeverageKeys[index]
      );

      if (remainingBeverages.length > 0) {
        remainingBeverages.forEach((bev) => {
          updatedDrinks[bev] = {
            ...updatedDrinks[bev],
            percentage: remainingPercentage / remainingBeverages.length,
          };
        });
      }

      return updatedDrinks;
    });
  };

  const handleRadioChange = (e, beverage) => {
    updateDrink(beverage, "packSize", Number(e.target.value));
  };
  const handleAverageChange = (e, beverage) => {
    updateDrink(beverage, "average", Number(e.target.value));
  };

  return (
    <div id="scale-container" className="flex flex-col">
      <section id="split-view" className="flex flex-col justify-center text-md">
        {selectedBeverageKeys.map((beverage, index) => (
          <fieldset key={beverage} className="flex flex-wrap m-3">
            <label htmlFor={beverage} className="mr-5 w-full">
              {drinks[beverage].name || ""}
            </label>
            <label>
              <input
                id={`${beverage}-percentage`}
                type="number"
                step="any"
                value={drinks[beverage].percentage || 0}
                onChange={(e) =>
                  handlePercentageChange(index, Number(e.target.value))
                }
                className="ml-1 mt-1 border border-emerald-500 p-2 rounded w-[4rem]"
              />
              %
            </label>
            <label className="flex items-center ml-2">
              <input
                type="checkbox"
                checked={drinks[beverage]?.locked || false}
                onChange={() => toggleLock(beverage)}
                className=""
              />
              Lock
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={drinks[beverage].percentage || 0}
              onChange={(e) =>
                handlePercentageChange(index, Number(e.target.value))
              }
              disabled={drinks[beverage].locked}
              className="w-full"
            />
            <label>
              <input
                id={`${beverage}-average`}
                type="number"
                step="any"
                value={Number(drinks[beverage].average).toString() || 0}
                onChange={(e) => handleAverageChange(e, beverage)}
                className="ml-1 mt-1 border border-emerald-500 p-2 rounded w-[3rem]"
              />
              drinks/hour
            </label>

            {beverage === "beer" && (
              <label className="ml-5">
                Pack size:
                <div
                  id="pack-options"
                  className="grid grid-rows-2 grid-flow-col gap-2"
                >
                  <label>
                    12 pack
                    <input
                      type="radio"
                      className="ml-1 border border-emerald-500 "
                      name="beerPackSize"
                      value="12"
                      onChange={(e) => handleRadioChange(e, beverage)}
                    />
                  </label>
                  <label>
                    18 pack
                    <input
                      type="radio"
                      className="ml-1 border border-emerald-500 "
                      name="beerPackSize"
                      value="18"
                      onChange={(e) => handleRadioChange(e, beverage)}
                    />
                  </label>
                  <label>
                    24 pack
                    <input
                      type="radio"
                      className="ml-1 border border-emerald-500 "
                      name="beerPackSize"
                      value="24"
                      onChange={(e) => handleRadioChange(e, beverage)}
                    />
                  </label>
                  <label>
                    30 pack
                    <input
                      type="radio"
                      className="ml-1 border border-emerald-500 "
                      name="beerPackSize"
                      value="30"
                      onChange={(e) => handleRadioChange(e, beverage)}
                    />
                  </label>
                </div>
              </label>
            )}

            {beverage === "hardSeltzers" && (
              <label className="ml-5">
                Pack size:
                <div
                  id="pack-options"
                  className="grid grid-rows-2 grid-flow-col gap-2"
                >
                  <label>
                    6 pack
                    <input
                      type="radio"
                      className="ml-1 border border-emerald-500 "
                      name="seltzerPackSize"
                      value="6"
                      onChange={handleRadioChange}
                    />
                  </label>
                  <label>
                    8 pack
                    <input
                      type="radio"
                      className="ml-1 border border-emerald-500 "
                      name="seltzerPackSize"
                      value="8"
                      onChange={handleRadioChange}
                    />
                  </label>
                  <label>
                    12 pack
                    <input
                      type="radio"
                      className="ml-1 border border-emerald-500 "
                      name="seltzerPackSize"
                      value="12"
                      onChange={handleRadioChange}
                    />
                  </label>
                  <label>
                    24 pack
                    <input
                      type="radio"
                      className="ml-1 border border-emerald-500 "
                      name="seltzerPackSize"
                      value="24"
                      onChange={handleRadioChange}
                    />
                  </label>
                </div>
              </label>
            )}
          </fieldset>
        ))}
      </section>
    </div>
  );
};
