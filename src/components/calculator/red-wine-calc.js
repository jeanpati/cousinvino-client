export const RedWineCalculations = ({ selectedDrinks }) => {
  return (
    <section>
      {selectedDrinks.redWine && (
        <div className="flex flex-col">
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
              You need {redWineNeeded} bottles! (Serves {redWineNeeded * 5}{" "}
              glasses.)
            </p>
          )}
        </div>
      )}
    </section>
  );
};
