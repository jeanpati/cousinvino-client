import { useEffect } from "react";
import { getTrackBackground, Range } from "react-range";

export const PercentageScale = ({ selectedDrinks, setDrinks, drinks }) => {
  const selectedBeverages = Object.keys(selectedDrinks).filter(
    (drink) => selectedDrinks[drink]
  );

  useEffect(() => {
    if (selectedBeverages.length < 2) return;

    const equalPercentage = 100 / selectedBeverages.length;

    setDrinks((prevDrinks) => {
      let updatedDrinks = { ...prevDrinks };

      selectedBeverages.forEach((bev) => {
        if (selectedDrinks[bev]) {
          updatedDrinks[bev] = {
            ...updatedDrinks[bev],
            percentage: equalPercentage || 0,
          };
        }
      });

      Object.keys(prevDrinks).forEach((bev) => {
        if (!selectedDrinks[bev]) {
          updatedDrinks[bev] = {
            ...updatedDrinks[bev],
            percentage: 0,
          };
        }
      });

      return updatedDrinks;
    });
  }, [selectedBeverages.length]);

  if (selectedBeverages.length < 2) return null;

  let sumOfBevPercentages = 0;
  const thumbValues = selectedBeverages.map((drink) => {
    sumOfBevPercentages += drinks[drink]?.percentage || 0;
    return sumOfBevPercentages;
  });

  const handleThumbChange = (newThumbValues) => {
    setDrinks((prevDrinks) => {
      let updatedDrinks = { ...prevDrinks };
      let previousPercentage = 0;

      newThumbValues.forEach((value, index) => {
        const bev1 = selectedBeverages[index];
        const bev2 = selectedBeverages[index + 1];

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
  const COLORS = ["blue", "yellow", "red", "purple", "green"];

  return (
    <div id="scale-container" className="flex flex-center">
      <Range
        key={selectedBeverages.join(",")}
        draggableTrack
        values={thumbValues}
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
                  values: thumbValues,
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
          const beverage = selectedBeverages[index];
          const beverageName = drinks[beverage]?.name || "";
          const percentage = Math.round(drinks[beverage]?.percentage, 2) || 0;
          const isLastThumb = index === selectedBeverages.length - 1;
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
                  color: isDragged ? COLORS[index] : "#AAA",
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
