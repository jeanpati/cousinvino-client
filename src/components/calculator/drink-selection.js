export const DrinkSelections = ({ setSelectedDrinks, selectedDrinks }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDrinks((prevState) => ({ ...prevState, [name]: checked }));
  };
  return (
    <div
      id="drink-options"
      className="grid grid-rows-3 grid-flow-col gap-2 text-lg"
    >
      <label>
        Red Wine
        <input
          type="checkbox"
          className="ml-1"
          name="redWine"
          onChange={handleCheckboxChange}
          checked={selectedDrinks.redWine}
        />
      </label>
      <label>
        White Wine
        <input
          type="checkbox"
          className="ml-1"
          name="whiteWine"
          onChange={handleCheckboxChange}
          checked={selectedDrinks.whiteWine}
        />
      </label>
      <label>
        Sparkling Wine
        <input
          type="checkbox"
          className="ml-1"
          name="sparklingWine"
          onChange={handleCheckboxChange}
          checked={selectedDrinks.sparklingWine}
        />
      </label>
      <label>
        Beer
        <input
          type="checkbox"
          className="ml-1"
          name="beer"
          onChange={handleCheckboxChange}
          checked={selectedDrinks.beer}
        />
      </label>
      <label>
        Hard Seltzers
        <input
          type="checkbox"
          className="ml-1"
          name="hardSeltzers"
          onChange={handleCheckboxChange}
          checked={selectedDrinks.hardSeltzers}
        />
      </label>
    </div>
  );
};
