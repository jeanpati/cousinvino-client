import { useEffect, useMemo, useState } from "react";
import {
  calculateCannedBeverages,
  calculateSparklingWine750ml,
  calculateSpirits,
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

  const [unit, setUnit] = useState("oz");

  useEffect(() => {
    if (selectedDrinks.redWine) {
      const redWineNeeded = calculateStillWine750ml(
        drinks.redWine?.percentage,
        numGuests,
        drinks.redWine?.average,
        eventHours
      );
      updateDrink("redWine", "needed", redWineNeeded || 0);
    }
    if (selectedDrinks.whiteWine) {
      const whiteWineNeeded = calculateStillWine750ml(
        drinks.whiteWine?.percentage,
        numGuests,
        drinks.whiteWine?.average,
        eventHours
      );
      updateDrink("whiteWine", "needed", whiteWineNeeded || 0);
    }
    if (selectedDrinks.sparklingWine) {
      const sparklingWineNeeded = calculateSparklingWine750ml(
        drinks.sparklingWine?.percentage,
        numGuests,
        drinks.sparklingWine?.average,
        eventHours
      );
      updateDrink("sparklingWine", "needed", sparklingWineNeeded || 0);
    }
    if (selectedDrinks.beer && drinks.beer?.size > 0) {
      const beerNeeded = calculateCannedBeverages(
        drinks.beer?.percentage,
        numGuests,
        drinks.beer?.average,
        eventHours,
        drinks.beer?.size
      );
      updateDrink("beer", "needed", beerNeeded || 0);
    }
    if (selectedDrinks.hardSeltzers && drinks.hardSeltzers?.size > 0) {
      const hardSeltzerNeeded = calculateCannedBeverages(
        drinks.hardSeltzers?.percentage,
        numGuests,
        drinks.hardSeltzers?.average,
        eventHours,
        drinks.hardSeltzers?.size
      );
      updateDrink("hardSeltzers", "needed", hardSeltzerNeeded || 0);
    }
    if (
      selectedDrinks.whiskey &&
      drinks.whiskey?.size > 0 &&
      drinks.whiskey?.amountPerDrink > 0
    ) {
      const whiskeyNeeded = calculateSpirits(
        drinks.whiskey?.percentage,
        numGuests,
        drinks.whiskey?.average,
        eventHours,
        drinks.whiskey?.size,
        drinks.whiskey?.amountPerDrink
      );
      updateDrink("whiskey", "needed", whiskeyNeeded || 0);
    }
    if (
      selectedDrinks.tequila &&
      drinks.tequila?.size > 0 &&
      drinks.tequila?.amountPerDrink > 0
    ) {
      const tequilaNeeded = calculateSpirits(
        drinks.tequila?.percentage,
        numGuests,
        drinks.tequila?.average,
        eventHours,
        drinks.tequila?.size,
        drinks.tequila?.amountPerDrink
      );
      updateDrink("tequila", "needed", tequilaNeeded || 0);
    }
    if (
      selectedDrinks.vodka &&
      drinks.vodka?.size > 0 &&
      drinks.vodka?.amountPerDrink > 0
    ) {
      const vodkaNeeded = calculateSpirits(
        drinks.vodka?.percentage,
        numGuests,
        drinks.vodka?.average,
        eventHours,
        drinks.vodka?.size,
        drinks.vodka?.amountPerDrink
      );
      updateDrink("vodka", "needed", vodkaNeeded || 0);
    }
    if (
      selectedDrinks.gin &&
      drinks.gin?.size > 0 &&
      drinks.gin?.amountPerDrink > 0
    ) {
      const ginNeeded = calculateSpirits(
        drinks.gin?.percentage,
        numGuests,
        drinks.gin?.average,
        eventHours,
        drinks.gin?.size,
        drinks.gin?.amountPerDrink
      );
      updateDrink("gin", "needed", ginNeeded || 0);
    }
    if (
      selectedDrinks.rum &&
      drinks.rum?.size > 0 &&
      drinks.rum?.amountPerDrink > 0
    ) {
      const rumNeeded = calculateSpirits(
        drinks.rum?.percentage,
        numGuests,
        drinks.rum?.average,
        eventHours,
        drinks.rum?.size,
        drinks.rum?.amountPerDrink
      );
      updateDrink("rum", "needed", rumNeeded || 0);
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
    drinks.beer.size,
    drinks.hardSeltzers.percentage,
    drinks.hardSeltzers.average,
    drinks.hardSeltzers.size,
    drinks.whiskey.percentage,
    drinks.whiskey.average,
    drinks.whiskey.size,
    drinks.whiskey.amountPerDrink,
    drinks.tequila.percentage,
    drinks.tequila.average,
    drinks.tequila.size,
    drinks.tequila.amountPerDrink,
    drinks.vodka.percentage,
    drinks.vodka.average,
    drinks.vodka.size,
    drinks.vodka.amountPerDrink,
    drinks.gin.percentage,
    drinks.gin.average,
    drinks.gin.size,
    drinks.gin.amountPerDrink,
    drinks.rum.percentage,
    drinks.rum.average,
    drinks.rum.size,
    drinks.rum.amountPerDrink,
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

  const handleDropDownChange = (e, beverage) => {
    updateDrink(beverage, "size", Number(e.target.value));
  };
  const handleAverageChange = (e, beverage) => {
    updateDrink(beverage, "average", Number(e.target.value));
  };

  //rounds to two decimal places
  const formatInput = (number) => {
    return Math.floor(number * 100) / 100;
  };

  const ozToMl = (oz) => {
    return oz * 29.57353;
  };

  const handleAmountPerDrinkChange = (e, beverage) => {
    if (e.target.value >= 0) {
      const amount = Number(e.target.value);

      if (unit === "oz") {
        const amountInMl = ozToMl(amount);
        updateDrink(beverage, "amountPerDrink", amountInMl);
      } else {
        updateDrink(beverage, "amountPerDrink", amount);
      }
    }
  };

  const handleUnitToggle = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
  };

  return (
    <div id="scale-container" className="flex flex-col">
      <section
        id="range-card-wrapper"
        className="flex flex-col justify-center text-lg"
      >
        {selectedBeverageKeys.map((beverage, index) => (
          <fieldset
            key={beverage}
            className="flex flex-wrap m-3 gap-x-4 rounded-xl p-3 shadow-md outline outline-black/5 bg-rose-50"
          >
            <label htmlFor={beverage} className="mr-5 w-full">
              {drinks[beverage].name || ""}
            </label>
            <label>
              <input
                id={`${beverage}-percentage`}
                type="number"
                step="any"
                value={
                  Math.round(Number(drinks[beverage].percentage)).toString() ||
                  0
                }
                onChange={(e) =>
                  handlePercentageChange(index, Number(e.target.value))
                }
                className="ml-1 mt-1 border border-emerald-500 p-1 rounded w-[4rem]"
              />{" "}
              %
              <p className="text-sm">
                (approx.{" "}
                {Math.round((drinks[beverage].percentage / 100) * numGuests)}{" "}
                guests)
              </p>
            </label>
            <div className="flex min-w-[6rem] justify-center flex-wrap self-end">
              <label className="flex items-center ml-1"> Lock</label>
              <input
                type="checkbox"
                checked={drinks[beverage]?.locked || false}
                onChange={() => toggleLock(beverage)}
                className="ml-1"
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={Number(drinks[beverage].percentage).toString() || 0}
              onChange={(e) =>
                handlePercentageChange(index, Number(e.target.value))
              }
              disabled={drinks[beverage].locked}
              className="w-full h-[2rem]"
            />

            <div id="below-range" className="flex flex-col">
              <label>
                <input
                  id={`${beverage}-average`}
                  type="number"
                  step="any"
                  value={Number(drinks[beverage].average).toString() || 0}
                  onChange={(e) => handleAverageChange(e, beverage)}
                  className="ml-1 mt-1 border border-emerald-500 pl-2 rounded w-[2rem]"
                />{" "}
                drinks/hour
              </label>

              {beverage === "beer" && (
                <label className="mt-1 ">
                  Pack size:
                  <select
                    className="ml-2 border border-emerald-500 p-1 rounded"
                    id="beer-size"
                    onChange={(e) => handleDropDownChange(e, beverage)}
                    value={drinks.beer?.size || 0}
                  >
                    <option value="">Select</option>
                    <option value="6">6 pack</option>
                    <option value="12">12 pack</option>
                    <option value="18">18 pack</option>
                    <option value="24">24 pack</option>
                    <option value="30">30 pack</option>
                  </select>
                </label>
              )}

              {beverage === "hardSeltzers" && (
                <label className="mt-1">
                  Pack size:
                  <select
                    className="ml-2 border border-emerald-500 p-1 rounded"
                    id="hardSeltzers-size"
                    onChange={(e) => handleDropDownChange(e, beverage)}
                    value={drinks.hardSeltzers?.size || 0}
                  >
                    <option value="0">Select</option>
                    <option value="4">4 pack</option>
                    <option value="6">6 pack</option>
                    <option value="8">8 pack</option>
                    <option value="12">12 pack</option>
                    <option value="24">24 pack</option>
                  </select>
                </label>
              )}

              {drinks[beverage]?.type === "spirit" && (
                <div className="flex gap-8">
                  <label className="flex flex-col mt-1">
                    Bottle size:
                    <select
                      className="border border-emerald-500 p-1 rounded max-w-[5rem]"
                      id={`${beverage}-size`}
                      onChange={(e) => handleDropDownChange(e, beverage)}
                      value={drinks[beverage]?.size || 0}
                    >
                      <option value="0">Select</option>
                      <option value="375">375ml</option>
                      <option value="750">750ml</option>
                      <option value="1000">1L</option>
                      <option value="1750">1.75L</option>
                    </select>
                  </label>

                  <div className="flex">
                    <label className="mt-1">
                      Amount/drink:
                      <div className="flex">
                        <input
                          id={`${beverage}-amount-per-drink`}
                          type="number"
                          min={0}
                          step="any"
                          value={
                            unit === "oz"
                              ? formatInput(
                                  drinks[beverage]?.amountPerDrink / 29.57353
                                ) || ""
                              : Math.round(drinks[beverage]?.amountPerDrink) ||
                                ""
                          }
                          onChange={(e) =>
                            handleAmountPerDrinkChange(e, beverage)
                          }
                          className="ml-1 border border-emerald-500 pl-2 rounded w-[3rem]"
                        />{" "}
                        <div
                          id="unit-selection"
                          className="flex gap-2 max-h-auto ml-2"
                        >
                          <label className="flex gap-1">
                            <input
                              type="radio"
                              value="oz"
                              checked={unit === "oz"}
                              onChange={handleUnitToggle}
                            />
                            oz
                          </label>
                          <label className="flex gap-1">
                            <input
                              type="radio"
                              value="ml"
                              checked={unit === "ml"}
                              onChange={handleUnitToggle}
                            />
                            ml
                          </label>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </fieldset>
        ))}
      </section>
    </div>
  );
};
