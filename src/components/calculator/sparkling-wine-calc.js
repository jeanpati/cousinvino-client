import { useEffect } from "react";
import { calculateSparklingWine750ml } from "../utils/calculations";

export const SparklingWineCalculations = ({
  selectedDrinks,
  drinks,
  updateDrink,
  numGuests,
  eventHours,
}) => {
  useEffect(() => {
    if (selectedDrinks.sparklingWine) {
      const sparklingWineNeeded = calculateSparklingWine750ml(
        drinks.sparklingWine.percentage,
        numGuests,
        drinks.sparklingWine.average,
        eventHours
      );
      updateDrink("sparklingWine", "needed", sparklingWineNeeded);
    }
  }, [
    numGuests,
    eventHours,
    drinks.sparklingWine.percentage,
    drinks.sparklingWine.average,
  ]);

  const handleSparklingWinePercentageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("sparklingWine", "percentage", Number(e.target.value));
    }
  };
  const handleSparklingWineAverageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("sparklingWine", "average", Number(e.target.value));
    }
  };

  return (
    <section id="sparkling-wine-details">
      {selectedDrinks.sparklingWine && (
        <div
          id="sparkling-wine-details-container"
          className="flex flex-col bg-blue-100 p-5 mb-1 rounded-2xl"
        >
          <h6>Sparkling Wine</h6>
          <label>
            {Math.round(drinks.sparklingWine.percentage, 2)}% guests
          </label>
          <label>
            <input
              id="sparkling-wine-average"
              type="number"
              step="any"
              value={drinks.sparklingWine.average}
              onChange={handleSparklingWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[3rem]"
            />
            drinks/hour
          </label>
        </div>
      )}
    </section>
  );
};
