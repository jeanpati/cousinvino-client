export const WhiteWineCalculations = ({
  selectedDrinks,

  drinks,
  updateDrink,
}) => {
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
          className="flex flex-col bg-blue-100 p-5 mb-1"
        >
          <label>
            What percentage of guests will drink white wine?
            <input
              id="white-wine-percentage"
              type="number"
              step="any"
              value={drinks.whiteWine.percentage}
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
              value={drinks.whiteWine.average}
              onChange={handleWhiteWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
        </div>
      )}
    </section>
  );
};
