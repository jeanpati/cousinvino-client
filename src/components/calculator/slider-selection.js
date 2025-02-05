export const SliderSelection = ({ handleRadioChange }) => {
  return (
    <section
      id="slider-selection"
      className=" flex flex-col items-start p-2 bg-white rounded-xl max-w-[10rem] min-w-[8rem] mb-5 text-xs"
    >
      <fieldset>
        <div>
          <input
            type="radio"
            id="split"
            value="split"
            name="slider-view"
            className="ml-1 mb-2 border border-emerald-500 rounded"
            onChange={handleRadioChange}
            defaultChecked
          />
          <label htmlFor="split" className="mr-5">
            Split view{" "}
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="combined"
            value="combined"
            name="slider-view"
            className="ml-1 border border-emerald-500 rounded"
            onChange={handleRadioChange}
          />
          <label htmlFor="combined" className="mr-5">
            Combined view{" "}
          </label>
        </div>
      </fieldset>
    </section>
  );
};
