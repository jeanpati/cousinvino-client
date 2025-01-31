import { useEffect, useMemo } from "react";
import { getTrackBackground, Range } from "react-range";

export const PercentageScale = ({ selectedDrinks, setDrinks, drinks }) => {
  const selectedBeverageKeys = useMemo(
    () => Object.keys(selectedDrinks).filter((drink) => selectedDrinks[drink]),
    [selectedDrinks]
  );

  useEffect(() => {
    if (selectedBeverageKeys.length === 0) return;

    const equalPercentage =
      selectedBeverageKeys.length === 1
        ? 100 // if only 1 beverage is selected, give it 100%
        : 100 / selectedBeverageKeys.length; // otherwise, divide equally

    setDrinks((drinksCopy) => {
      let updatedDrinks = { ...drinksCopy };

      selectedBeverageKeys.forEach((drink) => {
        if (selectedDrinks[drink]) {
          updatedDrinks[drink] = {
            ...updatedDrinks[drink],
            percentage: equalPercentage,
          };
        }
      });

      Object.keys(drinksCopy).forEach((drink) => {
        if (!selectedDrinks[drink]) {
          updatedDrinks[drink] = {
            ...updatedDrinks[drink],
            percentage: 0,
          };
        }
      });

      return updatedDrinks;
    });
  }, [selectedBeverageKeys.length]);

  if (selectedBeverageKeys.length === 0) return null;

  let sumOfPercentages = 0;
  const calculateThumbValues = selectedBeverageKeys.map((drink) => {
    sumOfPercentages += drinks[drink]?.percentage || 0;
    return sumOfPercentages;
  });

  const handleThumbChange = (newThumbValues) => {
    setDrinks((drinksCopy) => {
      let updatedDrinks = { ...drinksCopy };
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
  const COLORS = ["blue", "yellow", "red", "purple", "green", "pink", "silver"];

  return (
    <div id="scale-container" className="flex flex-center">
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
                height: "1rem",
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
          const percentage = Math.round(drinks[beverage]?.percentage, 2) || 0;
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
                  position: "absolute",
                  bottom: "2rem",
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#000000",
                  width: "100%",
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
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: `15px solid ${isDragged ? COLORS[index] : "#AAA"}`,
                  transform: "translateY(-1rem)",
                }}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
