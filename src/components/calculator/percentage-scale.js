import { useEffect, useState } from "react";
import { getTrackBackground, Range } from "react-range";

export const PercentageScale = ({ selectedDrinks, rtl, setDrinks, drinks }) => {
  const selectedBeverages = Object.keys(selectedDrinks).filter(
    (drink) => selectedDrinks[drink]
  );

  const handlePercentageChange = (index, value) => {
    const drinkType = selectedBeverages[index];
    setDrinks((prevDrinks) => ({
      ...prevDrinks,
      [drinkType]: {
        ...prevDrinks[drinkType],
        percentage: value,
      },
    }));
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
        values={selectedBeverages.index.percentage}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(e) => {
          handlePercentageChange(index, e.target.value);
        }}
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
                {beverage.name} {`${beverage.percentage}%`}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
