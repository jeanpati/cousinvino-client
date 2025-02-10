import { getTrackBackground, Range } from "react-range";
import { RedWineCalculations } from "../red-wine-calc";
import { WhiteWineCalculations } from "../white-wine-calc";
import { SparklingWineCalculations } from "../sparkling-wine-calc";
import { BeerCalculations } from "../beer-calc";
import { SeltzerCalculations } from "../seltzer-calc";

export const CombinedSlider = ({
  sliderChecked,
  updateDrink,
  numGuests,
  eventHours,
  selectedBeverageKeys,
  drinks,
  setDrinks,
  selectedDrinks,
}) => {
  let sumOfPercentages = 0;

  const calculateThumbValues = selectedBeverageKeys.map((drink) => {
    sumOfPercentages += drinks[drink]?.percentage || 0;
    return sumOfPercentages;
  });

  const handleThumbChange = (newThumbValues) => {
    setDrinks((prevDrinks) => {
      let updatedDrinks = { ...prevDrinks };
      let previousPercentage = 0;

      newThumbValues.forEach((value, index) => {
        const bev1 = selectedBeverageKeys[index];
        const bev2 = selectedBeverageKeys[index + 1];

        updatedDrinks[bev1] = {
          ...updatedDrinks[bev1],
          percentage: value - previousPercentage,
        };

        if (index === newThumbValues.length - 1) {
          updatedDrinks[bev2] = {
            ...updatedDrinks[bev2],
            percentage: 100 - value,
          };
        }

        previousPercentage = value;
      });

      return updatedDrinks;
    });
  };

  const STEP = 1;
  const MIN = 0;
  const MAX = 100;
  const COLORS = [
    "red",
    "yellow",
    "orange",
    "purple",
    "green",
    "pink",
    "silver",
  ];
  return (
    <>
      {sliderChecked === "combined" && (
        <section
          id="combined-view"
          className="flex flex-wrap justify-center text-xs mt-10"
        >
          <Range
            key={`${selectedBeverageKeys.join("-")}-track`} //re-renders the track when new thumbs are generated
            draggableTrack
            values={calculateThumbValues}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={handleThumbChange}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "2rem",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "1.5rem",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: calculateThumbValues,
                      colors: COLORS,
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged, index }) => {
              const beverage = selectedBeverageKeys[index];
              const beverageName = drinks[beverage]?.name || "";
              const percentage =
                Math.round(drinks[beverage]?.percentage, 2) || 0;
              const isLastThumb = index === selectedBeverageKeys.length - 1;
              return (
                <div
                  {...props}
                  key={props.key}
                  style={{
                    ...props.style,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: isLastThumb ? "none" : "auto",
                  }}
                >
                  <div
                    key={`${index}-label`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      position: "absolute",
                      bottom: "1.5rem",
                      textAlign: "center",
                      fontSize: "1rem",
                      color: "#000000",
                      width: "full",
                    }}
                  >
                    {beverageName} ({percentage}%)
                  </div>
                  <div
                    key={`${index}-arrow`}
                    style={{
                      position: "relative",
                      width: 0,
                      height: 0,
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: `8px solid ${isDragged ? COLORS[index] : "#AAA"}`,
                      transform: "translateY(-1rem)",
                    }}
                  />
                </div>
              );
            }}
          />
          <div className="bg-blue-50 backdrop-blur-md rounded-full px-4 py-2">
            <p>drag to adjust</p>
          </div>
          <div className="flex flex-col flex-wrap justify-between basis-full justify-center gap-1 mt-2 md:flex-row">
            <RedWineCalculations
              selectedDrinks={selectedDrinks}
              drinks={drinks}
              updateDrink={updateDrink}
              numGuests={numGuests}
              eventHours={eventHours}
            />
            <WhiteWineCalculations
              selectedDrinks={selectedDrinks}
              drinks={drinks}
              updateDrink={updateDrink}
              numGuests={numGuests}
              eventHours={eventHours}
              className="mr-4"
            />
            <SparklingWineCalculations
              selectedDrinks={selectedDrinks}
              drinks={drinks}
              updateDrink={updateDrink}
              numGuests={numGuests}
              eventHours={eventHours}
            />
            <BeerCalculations
              selectedDrinks={selectedDrinks}
              drinks={drinks}
              updateDrink={updateDrink}
              numGuests={numGuests}
              eventHours={eventHours}
            />
            <SeltzerCalculations
              selectedDrinks={selectedDrinks}
              drinks={drinks}
              updateDrink={updateDrink}
              numGuests={numGuests}
              eventHours={eventHours}
            />
          </div>
        </section>
      )}
    </>
  );
};
