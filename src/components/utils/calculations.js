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
