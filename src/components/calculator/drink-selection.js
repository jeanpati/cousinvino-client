export const DrinkSelections = ({ setSelectedDrinks }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDrinks((prevState) => ({ ...prevState, [name]: checked }));
  };
  return (
    <div id="drink-options" className="grid grid-rows-3 grid-flow-col gap-2">
      <label>
        Red Wine
        <input
          type="checkbox"
          className="ml-1 border border-emerald-500 rounded"
          name="redWine"
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        White Wine
        <input
          type="checkbox"
          className="ml-1 border border-emerald-500 rounded"
          name="whiteWine"
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        Sparkling Wine
        <input
          type="checkbox"
          className="ml-1 border border-emerald-500 rounded"
          name="sparklingWine"
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        Beer
        <input
          type="checkbox"
          className="ml-1 border border-emerald-500 rounded"
          name="beer"
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        Hard Seltzers
        <input
          type="checkbox"
          className="ml-1 border border-emerald-500 rounded"
          name="hardSeltzers"
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};
