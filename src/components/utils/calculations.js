export const calculateStillWine750ml = (
  drinkerPercentage,
  numGuests,
  drinkAverage,
  eventHours
) => {
  const glassesPer750 = 5;
  const bottlesNeeded750 = Math.ceil(
    ((drinkerPercentage / 100.0) * numGuests * drinkAverage * eventHours) /
      glassesPer750
  );
  return bottlesNeeded750;
};

export const calculateSparklingWine750ml = (
  drinkerPercentage,
  numGuests,
  drinkAverage,
  eventHours
) => {
  const glassesPer750 = 6;

  const bottlesNeeded750 = Math.ceil(
    ((drinkerPercentage / 100.0) * numGuests * drinkAverage * eventHours) /
      glassesPer750
  );
  return bottlesNeeded750;
};

export const calculateCannedBeverages = (
  drinkerPercentage,
  numGuests,
  drinkAverage,
  eventHours,
  packCount
) => {
  const drinksNeeded = Math.ceil(
    (drinkerPercentage / 100.0) * numGuests * drinkAverage * eventHours
  );
  const packsNeeded = Math.ceil(drinksNeeded / packCount);
  return packsNeeded;
};

export const calculateSpirits = (
  drinkerPercentage,
  numGuests,
  drinkAverage,
  eventHours,
  bottleSize,
  amountPerDrink
) => {
  const drinksNeeded = Math.ceil(
    (drinkerPercentage / 100.0) * numGuests * drinkAverage * eventHours
  );

  const drinksPerBottle = bottleSize / amountPerDrink;

  const bottlesNeeded = Math.ceil(drinksNeeded / drinksPerBottle);
  return bottlesNeeded;
};
