import { calculateCannedBeverages } from "../utils/calculations";

export const SeltzerCalculations = ({
  selectedDrinks,
  setSeltzerAverage,
  seltzerAverage,
  setSeltzerPercentage,
  seltzerPercentage,
  numGuests,
  eventHours,
  seltzerPackSize,
  setSeltzerPackSize,
}) => {
  const handleSeltzerPercentageChange = (e) => {
    if (e.target.value >= 0) {
      setSeltzerPercentage(Number(e.target.value));
    }
  };
  const handleSeltzerAverageChange = (e) => {
    if (e.target.value >= 0) {
      setSeltzerAverage(Number(e.target.value));
    }
  };
  const handleRadioChange = (e) => {
    setSeltzerPackSize(e.target.value);
  };

  const seltzersNeeded = calculateCannedBeverages(
    seltzerPercentage,
    numGuests,
    seltzerAverage,
    eventHours,
    seltzerPackSize
  );

  return (
    <section>
      {selectedDrinks.hardSeltzers && (
        <div className="flex flex-col">
          <label>
            What percentage of guests will drink hard seltzer?
            <input
              id="seltzer-percentage"
              type="number"
              step="any"
              value={seltzerPercentage}
              onChange={handleSeltzerPercentageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            On average, how many cans of hard seltzer will a guest have per
            hour?
            <input
              id="seltzer-average"
              type="number"
              step="any"
              value={seltzerAverage}
              onChange={handleSeltzerAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
          </label>
          <label>
            What size hard seltzer packs will you purchase?
            <div
              id="pack-options"
              className="grid grid-rows-2 grid-flow-col gap-2"
            >
              <label>
                6 pack
                <input
                  type="radio"
                  className="ml-1 border border-emerald-500 "
                  name="seltzerPackSize"
                  value="6"
                  onChange={handleRadioChange}
                />
              </label>
              <label>
                8 pack
                <input
                  type="radio"
                  className="ml-1 border border-emerald-500 "
                  name="seltzerPackSize"
                  value="8"
                  onChange={handleRadioChange}
                />
              </label>
              <label>
                12 pack
                <input
                  type="radio"
                  className="ml-1 border border-emerald-500 "
                  name="seltzerPackSize"
                  value="12"
                  onChange={handleRadioChange}
                />
              </label>
              <label>
                24 pack
                <input
                  type="radio"
                  className="ml-1 border border-emerald-500 "
                  name="seltzerPackSize"
                  value="24"
                  onChange={handleRadioChange}
                />
              </label>
            </div>
          </label>
          {seltzerPackSize > 0 && (
            <p>
              You need {seltzersNeeded} - {seltzerPackSize}pks of hard seltzer!
              (That&apos;s {seltzersNeeded * seltzerPackSize} cans)
            </p>
          )}
        </div>
      )}
    </section>
  );
};
