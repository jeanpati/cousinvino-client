export const PercentageScale = () => {
  return (
    <div id="scale-container">
      <label for="beverage-scale">Set your beverage percentages</label>
      <input type="range" name="beverage-scale" min="0" max="100" />
    </div>
  );
};
