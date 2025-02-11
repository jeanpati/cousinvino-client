import { useMemo } from "react";

export const Results = ({ selectedDrinks, drinks, drinksNeeded }) => {
  const totalDrinks = useMemo(() => {
    return (
      (drinks?.redWine?.needed * 5 || 0) +
      (drinks?.whiteWine?.needed * 5 || 0) +
      (drinks?.sparklingWine?.needed * 6 || 0) +
      (drinks?.beer?.needed * drinks.beer.packSize || 0) +
      (drinks?.hardSeltzers?.needed * drinks.hardSeltzers.packSize || 0)
    );
  }, [drinks]);

  return (
    <div className="mt-3">
      <section id="results">
        <table className="overflow-hidden items-center gap-x-4 rounded-2xl bg-white p-6 shadow-lg outline outline-black/5">
          <thead className="bg-amber-100">
            <tr>
              <th scope="col">Beverage</th>
              <th scope="col">Amount Needed</th>
              <th scope="col">Serves</th>
            </tr>
          </thead>
          <tbody>
            {selectedDrinks.redWine && drinks.redWine.needed > 0 && (
              <tr className="hover:bg-sky-100">
                <th scope="row">Red Wine</th>
                <td>{drinks.redWine.needed} bottles</td>
                <td>{drinks.redWine.needed * 5} glasses</td>
              </tr>
            )}

            {selectedDrinks.whiteWine && drinks.whiteWine.needed > 0 && (
              <tr className="hover:bg-sky-100">
                <th scope="row">White Wine</th>
                <td>{drinks.whiteWine.needed} bottles</td>
                <td>{drinks.whiteWine.needed * 5} glasses</td>
              </tr>
            )}

            {selectedDrinks.sparklingWine &&
              drinks.sparklingWine.needed > 0 && (
                <tr className="hover:bg-sky-100">
                  <th scope="row">Sparkling Wine</th>
                  <td>{drinks.sparklingWine.needed} bottles</td>
                  <td>{drinks.sparklingWine.needed * 6} glasses</td>
                </tr>
              )}

            {selectedDrinks.beer && drinks.beer?.packSize === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a beer pack size
                </td>
              </tr>
            ) : selectedDrinks.beer && drinks.beer?.needed > 0 ? (
              <tr className="hover:bg-sky-100">
                <th scope="row">Beer - {drinks.beer.packSize}pk</th>
                <td>{drinks.beer.needed} packs</td>
                <td>{drinks.beer.needed * drinks.beer.packSize} cans</td>
              </tr>
            ) : null}

            {selectedDrinks.hardSeltzers &&
            drinks.hardSeltzers?.packSize === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a hard seltzer pack size
                </td>
              </tr>
            ) : selectedDrinks.hardSeltzers &&
              drinks.hardSeltzers?.needed > 0 ? (
              <tr className="hover:bg-sky-100">
                <th scope="row">
                  Hard Seltzers - {drinks.hardSeltzers.packSize}pk
                </th>
                <td>{drinks.hardSeltzers.needed} packs</td>
                <td>
                  {drinks.hardSeltzers.needed * drinks.hardSeltzers.packSize}{" "}
                  cans
                </td>
              </tr>
            ) : null}

            {totalDrinks > drinksNeeded && (
              <tr>
                <th scope="row">TOTAL</th>
                <td></td>
                <td>{totalDrinks} drinks</td>
              </tr>
            )}
            {totalDrinks === drinksNeeded && (
              <tr>
                <th scope="row">TOTAL</th>
                <td></td>
                <td>{totalDrinks} drinks</td>
              </tr>
            )}

            {totalDrinks < drinksNeeded && (
              <tr>
                <th scope="row">TOTAL</th>
                <td></td>
                <td>{totalDrinks} drinks</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};
