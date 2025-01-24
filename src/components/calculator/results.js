export const Results = ({
  redWineNeeded,
  whiteWineNeeded,
  sparklingWineNeeded,
}) => {
  return (
    <div>
      <section id="results">
        {redWineNeeded > 0 && (
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
      </section>
    </div>
  );
};
