import { useEffect, useMemo, useState } from "react";
import { getTrackBackground, Range } from "react-range";

export const PercentageScale = ({ selectedDrinks, setDrinks, drinks }) => {
  const [checked, setChecked] = useState("split");

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
  const COLORS = [
    "red",
    "yellow",
    "orange",
    "purple",
    "green",
    "pink",
    "silver",
  ];

  const handleRadioChange = (e) => {
    setChecked(e.target.value);
  };
  return (
    <div id="scale-container" className="flex flex-col content-around">
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
      {checked === "combined" && (
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
                      fontSize: "12px",
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
            <p>drag to adjust percentages</p>
          </div>
        </section>
      )}
    </div>
  );
};
