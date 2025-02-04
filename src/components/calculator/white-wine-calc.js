import { useEffect } from "react";
import { calculateStillWine750ml } from "../utils/calculations";

export const WhiteWineCalculations = ({
  selectedDrinks,
  drinks,
  updateDrink,
  numGuests,
  eventHours,
}) => {
  useEffect(() => {
    if (selectedDrinks.whiteWine) {
      const whiteWineNeeded = calculateStillWine750ml(
        drinks.whiteWine.percentage,
        numGuests,
        drinks.whiteWine.average,
        eventHours
      );
      updateDrink("whiteWine", "needed", whiteWineNeeded);
    }
  }, [
    numGuests,
    eventHours,
    drinks.whiteWine.percentage,
    drinks.whiteWine.average,
  ]);
  const handleWhiteWinePercentageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("whiteWine", "percentage", Number(e.target.value));
    }
  };
  const handleWhiteWineAverageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("whiteWine", "average", Number(e.target.value));
    }
  };

  return (
    <section id="white-wine-details">
      {selectedDrinks.whiteWine && (
        <div
          id="white-wine-details-container"
          className="flex flex-col bg-blue-100 p-5 mb-1 rounded-2xl"
        >
          <h6>White Wine</h6>
          <label>{Math.round(drinks.whiteWine.percentage, 2)}% guests</label>
          <label>
            <input
              id="white-wine-average"
              type="number"
              step="any"
              value={drinks.whiteWine.average}
              onChange={handleWhiteWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[3rem]"
            />
            drinks/hour
          </label>
        </div>
      )}
    </section>
  );
};
