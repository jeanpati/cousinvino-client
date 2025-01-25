export const Results = ({
  redWineNeeded,
  whiteWineNeeded,
  sparklingWineNeeded,
  beerNeeded,
  beerPackSize,
  seltzerNeeded,
  seltzerPackSize,
  selectedDrinks,
}) => {
  return (
    <div>
      <section id="results">
        {selectedDrinks.redWine && redWineNeeded > 0 && (
          <p>
            You need {redWineNeeded} bottles of red wine! (Serves{" "}
            {redWineNeeded * 5} glasses)
          </p>
        )}

        {whiteWineNeeded > 0 && (
          <p>
            You need {whiteWineNeeded} bottles of white wine! (Serves{" "}
            {whiteWineNeeded * 5} glasses)
          </p>
        )}

        {sparklingWineNeeded > 0 && (
          <p>
            You need {sparklingWineNeeded} bottles of sparkling wine! (Serves{" "}
            {sparklingWineNeeded * 6} glasses)
          </p>
        )}
        {beerPackSize > 0 && (
          <p>
            You need {beerNeeded} - {beerPackSize}pks of beer! (That&apos;s{" "}
            {beerNeeded * beerPackSize} cans)
          </p>
        )}
        {seltzerPackSize > 0 && (
          <p>
            You need {seltzerNeeded} - {seltzerPackSize}pks of hard seltzer!
            (That&apos;s {seltzerNeeded * seltzerPackSize} cans)
          </p>
        )}
      </section>
    </div>
  );
};
