import { calculateSparklingWine750ml } from "../utils/calculations";

export const SparklingWineCalculations = ({
  selectedDrinks,
  setSparklingWineAverage,
  sparklingWineAverage,
  setSparklingWinePercentage,
  sparklingWinePercentage,
}) => {
  const handleSparklingWinePercentageChange = (e) => {
    if (e.target.value >= 0) {
      setSparklingWinePercentage(Number(e.target.value));
    }
  };
  const handleSparklingWineAverageChange = (e) => {
    if (e.target.value >= 0) {
      setSparklingWineAverage(Number(e.target.value));
    }
  };

  return (
    <section id="sparkling-wine-details">
      {selectedDrinks.sparklingWine && (
        <div
          id="sparkling-wine-details-wrapper"
          className="flex flex-col bg-blue-100 p-5 mb-1"
        >
          <label>
            What percentage of guests will drink sparkling wine?
            <input
              id="sparkling-wine-percentage"
              type="number"
              step="any"
              value={sparklingWinePercentage}
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
              value={sparklingWineAverage}
              onChange={handleSparklingWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
        </div>
      )}
    </section>
  );
};
