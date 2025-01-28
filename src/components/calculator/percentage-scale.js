import { useEffect, useState } from "react";
import { getTrackBackground, Range } from "react-range";

export const PercentageScale = ({
  selectedDrinks,
  setRedWinePercentage,
  setWhiteWinePercentage,
  setSparklingWinePercentage,
  setBeerPercentage,
  setSeltzerPercentage,
  rtl,
}) => {
  const beverageNames = {
    redWine: "Red Wine",
    whiteWine: "White Wine",
    sparklingWine: "Sparkling Wine",
    beer: "Beer",
    hardSeltzers: "Hard Seltzer",
  };

  const selectedBeverages = Object.keys(selectedDrinks).filter(
    (drink) => selectedDrinks[drink]
  );

  const readableBeverageNames = selectedBeverages.map(
    (beverage) => beverageNames[beverage]
  );
  const [values, setValues] = useState([25, 50, 75]);

  const totalPercentage = 100;

  //   useEffect(() => {
  //     const equidistantValues = round(
  //       totalPercentage / selectedBeverages.length,
  //       2
  //     );
  //     setValues(equidistantValues);
  //   }, [selectedBeverages]);

  const handleChange = (newValues) => {
    // Update the slider values
    setValues(newValues);

    // Update the percentages dynamically
    selectedBeverages.forEach((beverage, index) => {
      const percentage = newValues[index];

      if (beverage === "redWine") setRedWinePercentage(percentage);
      if (beverage === "whiteWine") setWhiteWinePercentage(percentage);
      if (beverage === "sparklingWine") setSparklingWinePercentage(percentage);
      if (beverage === "beer") setBeerPercentage(percentage);
      if (beverage === "hardSeltzers") setSeltzerPercentage(percentage);
    });
  };
  const STEP = 0.1;
  const MIN = 0;
  const MAX = 100;
  const COLORS = ["#0C2960", "#276EF1", "#9CBCF8", "#ccc"];
  return (
    <div id="scale-container" className="flex flex-center">
      <Range
        label="Select beverage percentages"
        draggableTrack
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: COLORS,
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => {
          const beverage = selectedBeverages[index];

          return (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "1.5rem",
                width: "1.5rem",
                borderRadius: "1rem",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? COLORS[index] : "#CCC",
                }}
              >
                {beverage} {`${0}%`}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
