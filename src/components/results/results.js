export const Results = ({ selectedDrinks, drinks, drinksNeeded }) => {
  const totalDrinks =
    (drinks?.redWine?.needed * 5 || 0) +
    (drinks?.whiteWine?.needed * 5 || 0) +
    (drinks?.sparklingWine?.needed * 6 || 0) +
    (drinks?.beer?.needed * drinks.beer.packSize || 0) +
    (drinks?.hardSeltzers?.needed * drinks.hardSeltzers.packSize || 0);

  return (
    <div>
      <section id="results">
        {selectedDrinks.redWine && drinks.redWine.needed > 0 && (
          <p>
            You need {drinks.redWine.needed} bottles of red wine! (Serves{" "}
            {drinks.redWine.needed * 5} glasses)
          </p>
        )}

        {selectedDrinks.whiteWine && drinks.whiteWine.needed > 0 && (
          <p>
            You need {drinks.whiteWine.needed} bottles of white wine! (Serves{" "}
            {drinks.whiteWine.needed * 5} glasses)
          </p>
        )}

        {selectedDrinks.sparklingWine && drinks.sparklingWine.needed > 0 && (
          <p>
            You need {drinks.sparklingWine.needed} bottles of sparkling wine!
            (Serves {drinks.sparklingWine.needed * 6} glasses)
          </p>
        )}
        {selectedDrinks.beer && drinks.beer.packSize > 0 && (
          <p>
            You need {drinks.beer.needed} - {drinks.beer.packSize}pks of beer!
            (That&apos;s {drinks.beer.needed * drinks.beer.packSize} cans)
          </p>
        )}
        {selectedDrinks.hardSeltzers && drinks.hardSeltzers.packSize > 0 && (
          <p>
            You need {drinks.hardSeltzers.needed} -{" "}
            {drinks.hardSeltzers.packSize}pks of hard seltzer! (That&apos;s{" "}
            {drinks.hardSeltzers.needed * drinks.hardSeltzers.packSize} cans)
          </p>
        )}
        {totalDrinks >= drinksNeeded && (
          <p>
            You&apos;re in good shape! You have more than enough drinks!{" "}
            {`You can serve ${totalDrinks} glasses`}
          </p>
        )}
        {totalDrinks === drinksNeeded && (
          <p>You have just enough! {`You can serve ${totalDrinks} glasses`}</p>
        )}

        {totalDrinks < drinksNeeded && (
          <p>
            You&apos;re a little under but that might be okay!{" "}
            {`You can serve ${totalDrinks} glasses`}
          </p>
        )}
      </section>
    </div>
  );
};
