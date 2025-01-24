export const Results = ({ redWineNeeded, whiteWineNeeded }) => {
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
      </section>
    </div>
  );
};
