import { calculateSparklingWine750ml } from "../utils/calculations";

export const SparklingWineCalculations = ({
  selectedDrinks,
  drinks,
  updateDrink,
  numGuests,
  eventHours,
}) => {
  useEffect(() => {
    const sparklingWineNeeded = calculateSparklingWine750ml(
      drinks.sparklingWine.percentage,
      numGuests,
      drinks.sparklingWine.average,
      eventHours
    );
    updateDrink("sparklingWine", "needed", sparklingWineNeeded);
  }, [
    numGuests,
    eventHours,
    drinks.sparklingWine.percentage,
    drinks.sparklingWine.average,
    updateDrink,
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
          className="flex flex-col bg-blue-100 p-5 mb-1"
        >
          <label>
            What percentage of guests will drink sparkling wine?
            <input
              id="sparkling-wine-percentage"
              type="number"
              step="any"
              value={drinks.sparklingWine.percentage}
              onChange={handleSparklingWinePercentageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            On average, how many glasses of sparkling wine will a guest have per
            hour?
            <input
              id="sparkling-wine-average"
              type="number"
              step="any"
              value={drinks.sparklingWine.average}
              onChange={handleSparklingWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
        </div>
      )}
    </section>
  );
};
