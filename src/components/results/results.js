import { useMemo } from "react";

export const Results = ({ selectedDrinks, drinks, drinksNeeded }) => {
  const totalDrinks = useMemo(() => {
    return (
      (drinks?.redWine?.needed * 5 || 0) +
      (drinks?.whiteWine?.needed * 5 || 0) +
      (drinks?.sparklingWine?.needed * 6 || 0) +
      (drinks?.beer?.needed * drinks?.beer?.size || 0) +
      (drinks?.hardSeltzers?.needed * drinks.hardSeltzers.size || 0) +
      (Math.floor(
        drinks?.whiskey?.needed *
          (drinks?.whiskey?.size / drinks?.whiskey?.amountPerDrink)
      ) || 0) +
      (Math.floor(
        drinks?.tequila?.needed *
          (drinks?.tequila?.size / drinks?.tequila?.amountPerDrink)
      ) || 0) +
      (Math.floor(
        drinks?.vodka?.needed *
          (drinks?.vodka?.size / drinks?.vodka?.amountPerDrink)
      ) || 0) +
      (Math.floor(
        drinks?.gin?.needed * (drinks?.gin?.size / drinks?.gin?.amountPerDrink)
      ) || 0) +
      (Math.floor(
        drinks?.rum?.needed * (drinks?.rum?.size / drinks?.rum?.amountPerDrink)
      ) || 0)
    );
  }, [drinks]);

  return (
    <div className="">
      <section id="results">
        <table className="overflow-hidden items-center rounded-2xl bg-white shadow-lg outline outline-black/5 text-lg md:text-xl">
          <thead className="bg-amber-100">
            <tr>
              <th scope="col">Beverage</th>
              <th scope="col">Amount Needed</th>
              <th scope="col">Serves</th>
            </tr>
          </thead>
          <tbody>
            {selectedDrinks.redWine && drinks.redWine.needed > 0 && (
              <tr className="hover:bg-rose-50">
                <th scope="row">Red Wine - 750ml</th>
                <td>{drinks.redWine.needed} bottles</td>
                <td>{drinks.redWine.needed * 5} glasses</td>
              </tr>
            )}

            {selectedDrinks.whiteWine && drinks.whiteWine.needed > 0 && (
              <tr className="hover:bg-rose-50">
                <th scope="row">White Wine - 750ml</th>
                <td>{drinks.whiteWine.needed} bottles</td>
                <td>{drinks.whiteWine.needed * 5} glasses</td>
              </tr>
            )}

            {selectedDrinks.sparklingWine &&
              drinks.sparklingWine.needed > 0 && (
                <tr className="hover:bg-rose-50">
                  <th scope="row">Sparkling Wine - 750ml</th>
                  <td>{drinks.sparklingWine.needed} bottles</td>
                  <td>{drinks.sparklingWine.needed * 6} glasses</td>
                </tr>
              )}

            {selectedDrinks.beer && drinks.beer?.size === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a beer pack size
                </td>
              </tr>
            ) : selectedDrinks.beer && drinks.beer?.needed > 0 ? (
              <tr className="hover:bg-rose-50">
                <th scope="row">Beer - {drinks.beer.size}pk</th>
                <td>{drinks.beer.needed} packs</td>
                <td>{drinks.beer.needed * drinks.beer.size} cans</td>
              </tr>
            ) : null}

            {selectedDrinks.hardSeltzers && drinks.hardSeltzers?.size === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a hard seltzer pack size
                </td>
              </tr>
            ) : selectedDrinks.hardSeltzers &&
              drinks.hardSeltzers?.needed > 0 ? (
              <tr className="hover:bg-rose-50">
                <th scope="row">
                  Hard Seltzers - {drinks.hardSeltzers.size}pk
                </th>
                <td>{drinks.hardSeltzers.needed} packs</td>
                <td>
                  {drinks.hardSeltzers.needed * drinks.hardSeltzers.size} cans
                </td>
              </tr>
            ) : null}

            {selectedDrinks.whiskey && drinks.whiskey?.size === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a whiskey bottle size
                </td>
              </tr>
            ) : selectedDrinks.whiskey &&
              drinks.whiskey?.amountPerDrink === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please enter the amount of whiskey per drink
                </td>
              </tr>
            ) : selectedDrinks.whiskey && drinks.whiskey?.needed > 0 ? (
              <tr className="hover:bg-rose-50">
                {drinks.whiskey?.size <= 750 && (
                  <th scope="row">Whiskey - {drinks.whiskey?.size}ml</th>
                )}
                {drinks.whiskey?.size > 750 && (
                  <th scope="row">Whiskey - {drinks.whiskey?.size / 1000}L</th>
                )}

                <td>{drinks.whiskey.needed} bottles</td>
                <td>
                  {Math.floor(
                    drinks.whiskey.needed *
                      (drinks.whiskey?.size / drinks.whiskey?.amountPerDrink)
                  )}{" "}
                  drinks
                </td>
              </tr>
            ) : null}

            {selectedDrinks.tequila && drinks.tequila?.size === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a tequila bottle size
                </td>
              </tr>
            ) : selectedDrinks.tequila &&
              drinks.tequila?.amountPerDrink === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please enter the amount of tequila per drink
                </td>
              </tr>
            ) : selectedDrinks.tequila && drinks.tequila?.needed > 0 ? (
              <tr className="hover:bg-rose-50">
                {drinks.tequila?.size <= 750 && (
                  <th scope="row">Tequila - {drinks.tequila?.size}ml</th>
                )}
                {drinks.tequila?.size > 750 && (
                  <th scope="row">Tequila - {drinks.tequila?.size / 1000}L</th>
                )}

                <td>{drinks.tequila.needed} bottles</td>
                <td>
                  {Math.floor(
                    drinks.tequila.needed *
                      (drinks.tequila?.size / drinks.tequila?.amountPerDrink)
                  )}{" "}
                  drinks
                </td>
              </tr>
            ) : null}

            {selectedDrinks.vodka && drinks.vodka?.size === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a vodka bottle size
                </td>
              </tr>
            ) : selectedDrinks.vodka && drinks.vodka?.amountPerDrink === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please enter the amount of vodka per drink
                </td>
              </tr>
            ) : selectedDrinks.vodka && drinks.vodka?.needed > 0 ? (
              <tr className="hover:bg-rose-50">
                {drinks.vodka?.size <= 750 && (
                  <th scope="row">Vodka - {drinks.vodka?.size}ml</th>
                )}
                {drinks.vodka?.size > 750 && (
                  <th scope="row">Vodka - {drinks.vodka?.size / 1000}L</th>
                )}

                <td>{drinks.vodka.needed} bottles</td>
                <td>
                  {Math.floor(
                    drinks.vodka.needed *
                      (drinks.vodka?.size / drinks.vodka?.amountPerDrink)
                  )}{" "}
                  drinks
                </td>
              </tr>
            ) : null}

            {selectedDrinks.gin && drinks.gin?.size === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a gin bottle size
                </td>
              </tr>
            ) : selectedDrinks.gin && drinks.gin?.amountPerDrink === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please enter the amount of gin per drink
                </td>
              </tr>
            ) : selectedDrinks.gin && drinks.gin?.needed > 0 ? (
              <tr className="hover:bg-rose-50">
                {drinks.gin?.size <= 750 && (
                  <th scope="row">Gin - {drinks.gin?.size}ml</th>
                )}
                {drinks.gin?.size > 750 && (
                  <th scope="row">Gin - {drinks.gin?.size / 1000}L</th>
                )}

                <td>{drinks.gin.needed} bottles</td>
                <td>
                  {Math.floor(
                    drinks.gin.needed *
                      (drinks.gin?.size / drinks.gin?.amountPerDrink)
                  )}{" "}
                  drinks
                </td>
              </tr>
            ) : null}

            {selectedDrinks.rum && drinks.rum?.size === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please select a rum bottle size
                </td>
              </tr>
            ) : selectedDrinks.rum && drinks.rum?.amountPerDrink === 0 ? (
              <tr className="bg-yellow-100">
                <td colSpan="3" className="text-center text-yellow-800">
                  Please enter the amount of rum per drink
                </td>
              </tr>
            ) : selectedDrinks.rum && drinks.rum?.needed > 0 ? (
              <tr className="hover:bg-rose">
                {drinks.rum?.size <= 750 && (
                  <th scope="row">Rum - {drinks.rum?.size}ml</th>
                )}
                {drinks.rum?.size > 750 && (
                  <th scope="row">Rum - {drinks.rum?.size / 1000}L</th>
                )}

                <td>{drinks.rum.needed} bottles</td>
                <td>
                  {Math.floor(
                    drinks.rum.needed *
                      (drinks.rum?.size / drinks.rum?.amountPerDrink)
                  )}{" "}
                  drinks
                </td>
              </tr>
            ) : null}

            <tr>
              <th scope="row">TOTAL</th>
              <td></td>
              <td>{totalDrinks} drinks</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
