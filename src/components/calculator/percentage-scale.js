import { useEffect, useMemo, useState } from "react";
import { calculateStillWine750ml } from "../utils/calculations";

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
  }, [numGuests, eventHours, drinks.redWine]);

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
          [remainingBeverage]: { percentage: 100 - lockedTotal },
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
            percentage: remainingPercentage / remainingBeverages.length,
          };
        });
      }

      return updatedDrinks;
    });
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
                value={drinks[beverage].average || 0}
                onChange={(e) =>
                  updateDrink(beverage, "average", Number(e.target.value))
                }
                className="ml-1 mt-1 border border-emerald-500 p-2 rounded w-[3rem]"
              />
              drinks/hour
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
          </fieldset>
        ))}
      </section>
    </div>
  );
};
