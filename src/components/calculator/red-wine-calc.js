import { calculateStillWine750ml } from "../utils/calculations";

export const RedWineCalculations = ({
  selectedDrinks,
  setRedWineAverage,
  redWineAverage,
  setRedWinePercentage,
  redWinePercentage,
  numGuests,
  eventHours,
}) => {
  const handleRedWinePercentageChange = (e) => {
    if (e.target.value >= 0) {
      setRedWinePercentage(Number(e.target.value));
    }
  };
  const handleRedWineAverageChange = (e) => {
    if (e.target.value >= 0) {
      setRedWineAverage(Number(e.target.value));
    }
  };
  const redWineNeeded = calculateStillWine750ml(
    redWinePercentage,
    numGuests,
    redWineAverage,
    eventHours
  );

  return (
    <section id="red-wine-details">
      {selectedDrinks.redWine && (
        <div
          id="red-wine-details-wrapper"
          className=" flex flex-col bg-blue-100 p-5 mb-1"
        >
          <label>
            What percentage of guests will drink red wine?
            <input
              id="red-wine-percentage"
              type="number"
              step="any"
              value={redWinePercentage}
              onChange={handleRedWinePercentageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            On average, how many glasses of red wine will a guest have per hour?
            <input
              id="red-wine-average"
              type="number"
              step="any"
              value={redWineAverage}
              onChange={handleRedWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          {redWineNeeded > 0 && (
            <p>
              You need {redWineNeeded} bottles of red wine! (Serves{" "}
              {redWineNeeded * 5} glasses)
            </p>
          )}
        </div>
      )}
    </section>
  );
};
