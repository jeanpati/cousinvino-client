import { useEffect, useMemo, useState } from "react";

import { SliderSelection } from "./slider-selection";
import { CombinedSlider } from "./slider-views/combined-slider";

export const PercentageScale = ({
  selectedDrinks,
  setDrinks,
  drinks,
  updateDrink,
  numGuests,
  eventHours,
}) => {
  const [sliderChecked, setSliderChecked] = useState("split");
  const selectedBeverageKeys = useMemo(
    () => Object.keys(selectedDrinks).filter((drink) => selectedDrinks[drink]),
    [selectedDrinks]
  );

  useEffect(() => {
    if (selectedBeverageKeys.length === 0) return;

    const equalPercentage =
      selectedBeverageKeys.length === 1
        ? 100 // if only 1 beverage is selected, give it 100%
        : 100 / selectedBeverageKeys.length; // otherwise, divide equally

    setDrinks((drinksCopy) => {
      let updatedDrinks = { ...drinksCopy };

      selectedBeverageKeys.forEach((drink) => {
        if (selectedDrinks[drink]) {
          updatedDrinks[drink] = {
            ...updatedDrinks[drink],
            percentage: equalPercentage,
          };
        }
      });

      Object.keys(drinksCopy).forEach((drink) => {
        if (!selectedDrinks[drink]) {
          updatedDrinks[drink] = {
            ...updatedDrinks[drink],
            percentage: 0,
          };
        }
      });

      return updatedDrinks;
    });
  }, [selectedBeverageKeys.length]);

  if (selectedBeverageKeys.length === 0) return null;

  let sumOfPercentages = 0;

  const calculateThumbValues = selectedBeverageKeys.map((drink) => {
    sumOfPercentages += drinks[drink]?.percentage || 0;
    return sumOfPercentages;
  });

  const handleThumbChange = (newThumbValues) => {
    setDrinks((drinksCopy) => {
      let updatedDrinks = { ...drinksCopy };
      let previousPercentage = 0;

      newThumbValues.forEach((value, index) => {
        const bev1 = selectedBeverageKeys[index];
        const bev2 = selectedBeverageKeys[index + 1];

        updatedDrinks[bev1] = {
          ...updatedDrinks[bev1],
          percentage: value - previousPercentage,
        };

        if (index === newThumbValues.length - 1) {
          updatedDrinks[bev2] = {
            ...updatedDrinks[bev2],
            percentage: 100 - value,
          };
        }

        previousPercentage = value;
      });

      return updatedDrinks;
    });
  };

  const STEP = 1;
  const MIN = 0;
  const MAX = 100;
  const COLORS = [
    "red",
    "yellow",
    "orange",
    "purple",
    "green",
    "pink",
    "silver",
  ];

  const handleRadioChange = (e) => {
    setSliderChecked(e.target.value);
  };

  const handleBeverageAverageChange = (e, beverage) => {
    if (e.target.value >= 0) {
      updateDrink(`${beverage}`, "average", Number(e.target.value));
    }
  };
  return (
    <div id="scale-container" className="flex flex-col content-around">
      <SliderSelection handleRadioChange={handleRadioChange} />
      {sliderChecked === "split" && (
        <section
          id="split-view"
          className="flex flex-col justify-center text-md mt-10"
        >
          {selectedBeverageKeys.map((beverage) => {
            const beverageName = drinks[beverage]?.name || "";
            const percentage = Math.round(drinks[beverage]?.percentage, 2) || 0;
            return (
              <fieldset key={beverage} className="flex flex-col h-16">
                <label htmlFor={beverage} className="mr-5">
                  {beverageName}
                </label>
                <label>
                  <input
                    id={`${beverage}-average`}
                    type="number"
                    step="any"
                    value={drinks[beverage].average}
                    onChange={handleBeverageAverageChange}
                    className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[3rem]"
                  />
                  drinks/hour
                </label>
                <label>
                  <input
                    id={`${beverage}-percentage`}
                    type="number"
                    step="any"
                    className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[3rem]"
                  />
                  %
                </label>
                <input type="range" />
              </fieldset>
            );
          })}
        </section>
      )}
      <CombinedSlider
        sliderChecked={sliderChecked}
        updateDrink={updateDrink}
        numGuests={numGuests}
        eventHours={eventHours}
        selectedBeverageKeys={selectedBeverageKeys}
        drinks={drinks}
        setDrinks={setDrinks}
        selectedDrinks={selectedDrinks}
      />
    </div>
  );
};
