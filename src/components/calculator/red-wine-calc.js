export const RedWineCalculations = ({
  selectedDrinks,
  drinks,
  updateDrink,
}) => {
  const handleRedWinePercentageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("redWine", "percentage", Number(e.target.value));
    }
  };
  const handleRedWineAverageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("redWine", "average", Number(e.target.value));
    }
  };

  return (
    <section id="red-wine-details">
      {selectedDrinks.redWine && (
        <div
          id="red-wine-details-container"
          className=" flex flex-col bg-blue-100 p-5 mb-1"
        >
          <h6>Red Wine</h6>
          <label>
            What percentage of guests will drink red wine?
            <input
              id="red-wine-percentage"
              type="number"
              step="any"
              value={drinks.redWine.percentage}
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
              value={drinks.redWine.average}
              onChange={handleRedWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
        </div>
      )}
    </section>
  );
};
