import { calculateCannedBeverages } from "../utils/calculations";

export const BeerCalculations = ({
  selectedDrinks,
  setBeerAverage,
  beerAverage,
  setBeerPercentage,
  beerPercentage,
  numGuests,
  eventHours,
  beerPackSize,
  setBeerPackSize,
}) => {
  const handleBeerPercentageChange = (e) => {
    if (e.target.value >= 0) {
      setBeerPercentage(Number(e.target.value));
    }
  };
  const handleBeerAverageChange = (e) => {
    if (e.target.value >= 0) {
      setBeerAverage(Number(e.target.value));
    }
  };
  const handleRadioChange = (e) => {
    setBeerPackSize(e.target.value);
  };

  const beerNeeded = calculateCannedBeverages(
    beerPercentage,
    numGuests,
    beerAverage,
    eventHours,
    beerPackSize
  );

  return (
    <section id="beer-details">
      {selectedDrinks.beer && (
        <div
          id="beer-details-wrapper"
          className=" flex flex-col bg-blue-100 p-5 mb-1"
        >
          <label>
            What percentage of guests will drink beer?
            <input
              id="beer-percentage"
              type="number"
              step="any"
              value={beerPercentage}
              onChange={handleBeerPercentageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            On average, how many cans of beer will a guest have per hour?
            <input
              id="beer-average"
              type="number"
              step="any"
              value={beerAverage}
              onChange={handleBeerAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            What size beer packs will you purchase?
            <div
              id="pack-options"
              className="grid grid-rows-2 grid-flow-col gap-2"
            >
              <label>
                12 pack
                <input
                  type="radio"
                  className="ml-1 border border-emerald-500 "
                  name="beerPackSize"
                  value="12"
                  onChange={handleRadioChange}
                />
              </label>
              <label>
                18 pack
                <input
                  type="radio"
                  className="ml-1 border border-emerald-500 "
                  name="beerPackSize"
                  value="18"
                  onChange={handleRadioChange}
                />
              </label>
              <label>
                24 pack
                <input
                  type="radio"
                  className="ml-1 border border-emerald-500 "
                  name="beerPackSize"
                  value="24"
                  onChange={handleRadioChange}
                />
              </label>
              <label>
                30 pack
                <input
                  type="radio"
                  className="ml-1 border border-emerald-500 "
                  name="beerPackSize"
                  value="30"
                  onChange={handleRadioChange}
                />
              </label>
            </div>
          </label>
          {beerPackSize > 0 && (
            <p>
              You need {beerNeeded} - {beerPackSize}pks of beer! (That&apos;s{" "}
              {beerNeeded * beerPackSize} cans)
            </p>
          )}
        </div>
      )}
    </section>
  );
};
