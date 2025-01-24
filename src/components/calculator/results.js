export const Results = ({ redWineNeeded }) => {
  return (
    <div>
      <section id="results">
        {redWineNeeded > 0 && (
          <p>
            You need {redWineNeeded} bottles of red wine! (Serves{" "}
            {redWineNeeded * 5} glasses)
          </p>
        )}
      </section>
    </div>
  );
};
