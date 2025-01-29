import { useEffect } from "react";
import { calculateCannedBeverages } from "../utils/calculations";

export const SeltzerCalculations = ({
  selectedDrinks,
  drinks,
  updateDrink,
  numGuests,
  eventHours,
}) => {
  useEffect(() => {
    const hardSeltzerNeeded = calculateCannedBeverages(
      drinks.hardSeltzers.percentage,
      numGuests,
      drinks.hardSeltzers.average,
      eventHours,
      drinks.hardSeltzers.packSize
    );
    updateDrink("hardSeltzers", "needed", hardSeltzerNeeded);
  }, [
    numGuests,
    eventHours,
    drinks.hardSeltzers.percentage,
    drinks.hardSeltzers.average,
    drinks.hardSeltzers.packSize,
  ]);

  const handleSeltzerPercentageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("hardSeltzers", "percentage", Number(e.target.value));
    }
  };
  const handleSeltzerAverageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("hardSeltzers", "average", Number(e.target.value));
    }
  };
  const handleRadioChange = (e) => {
    updateDrink("hardSeltzers", "packSize", Number(e.target.value));
  };

  return (
    <section id="seltzer-details">
      {selectedDrinks.hardSeltzers && (
        <div
          id="seltzer-details-container"
          className=" flex flex-col bg-blue-100 p-5 mb-1"
        >
          <label>
            What percentage of guests will drink hard seltzer?
            <input
              id="seltzer-percentage"
              type="number"
              step="any"
              value={drinks.hardSeltzers.percentage}
              onChange={handleSeltzerPercentageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            On average, how many cans of hard seltzer will a guest have per
            hour?
            <input
              id="seltzer-average"
              type="number"
              step="any"
              value={drinks.hardSeltzers.average}
              onChange={handleSeltzerAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            What size hard seltzer packs will you purchase?
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
        </div>
      )}
    </section>
  );
};
