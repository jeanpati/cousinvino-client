import { calculateStillWine750ml } from "../utils/calculations";

export const WhiteWineCalculations = ({
  selectedDrinks,
  setWhiteWineAverage,
  whiteWineAverage,
  setWhiteWinePercentage,
  whiteWinePercentage,
  numGuests,
  eventHours,
}) => {
  const handleWhiteWinePercentageChange = (e) => {
    if (e.target.value >= 0) {
      setWhiteWinePercentage(Number(e.target.value));
    }
  };
  const handleWhiteWineAverageChange = (e) => {
    if (e.target.value >= 0) {
      setWhiteWineAverage(Number(e.target.value));
    }
  };
  const whiteWineNeeded = calculateStillWine750ml(
    whiteWinePercentage,
    numGuests,
    whiteWineAverage,
    eventHours
  );

  return (
    <section>
      {selectedDrinks.whiteWine && (
        <div className="flex flex-col">
          <label>
            What percentage of guests will drink white wine?
            <input
              id="white-wine-percentage"
              type="number"
              step="any"
              value={whiteWinePercentage}
              onChange={handleWhiteWinePercentageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            On average, how many glasses of white wine will a guest have per
            hour?
            <input
              id="white-wine-average"
              type="number"
              step="any"
              value={whiteWineAverage}
              onChange={handleWhiteWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          {whiteWineNeeded > 0 && (
            <p>
              You need {whiteWineNeeded} bottles of white wine! (Serves{" "}
              {whiteWineNeeded * 5} glasses)
            </p>
          )}
        </div>
      )}
    </section>
  );
};
