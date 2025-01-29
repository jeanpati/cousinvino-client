export const Results = ({ selectedDrinks, drinks }) => {
  return (
    <div>
      <section id="results">
        {selectedDrinks.redWine && drinks.redWine.needed > 0 && (
          <p>
            You need {drinks.redWine.needed} bottles of red wine! (Serves{" "}
            {drinks.redWine.needed * 5} glasses)
          </p>
        )}

        {drinks.whiteWine.needed > 0 && (
          <p>
            You need {drinks.whiteWine.needed} bottles of white wine! (Serves{" "}
            {drinks.whiteWine.needed * 5} glasses)
          </p>
        )}

        {drinks.sparklingWine.needed > 0 && (
          <p>
            You need {drinks.sparklingWine.needed} bottles of sparkling wine!
            (Serves {drinks.sparklingWine.needed * 6} glasses)
          </p>
        )}
        {drinks.beer.packSize > 0 && (
          <p>
            You need {drinks.beer.needed} - {drinks.beer.packSize}pks of beer!
            (That&apos;s {drinks.beer.needed * drinks.beer.packSize} cans)
          </p>
        )}
        {drinks.hardSeltzers.packSize > 0 && (
          <p>
            You need {drinks.hardSeltzers.needed} -{" "}
            {drinks.hardSeltzers.packSize}pks of hard seltzer! (That&apos;s{" "}
            {drinks.hardSeltzers.needed * drinks.hardSeltzers.packSize} cans)
          </p>
        )}
      </section>
    </div>
  );
};
