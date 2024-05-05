import { HiArchive, HiOutlineKey } from "react-icons/hi";
import { HiServer } from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";

function WelcomePage() {
  const { statistic, loadingStatistic } = useContext(DataContext);
  const [languages, setLanguages] = useState(0);

  useEffect(() => {
    const count =
      statistic?.global?.by_language?.languages?.filter(
        (item) => item.cryptograms_count === 0,
      )?.length ?? 0;
    setLanguages(count);
  }, [statistic]);

  return (
    <>
      {loadingStatistic ? (
        <div>Loading...</div>
      ) : (
        <section className="antialiased">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                Welcome to the HCPortal database of cryptograms and cipher keys!
              </h2>
              <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                You can contribute to our database by adding new records after
                registration.
              </p>
            </div>

            <div className="grid grid-cols-1 mt-12 sm:mt-16 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4 border border-gray-100 rounded shadow p-3 flex flex-col items-center">
                <HiArchive
                  className={"rounded-full text-gray-500 p-0.5 bg-gray-100"}
                  size={32}
                />
                <h3 className="text-2xl text-center font-bold leading-tight text-gray-900 dark:text-white">
                  Database of Cryptograms
                </h3>
                <p className="font-sans text-start text-gray-500 dark:text-gray-400">
                  The database contains{" "}
                  <b>{statistic.global.count.cryptograms}</b> cryptograms. Among
                  them,{" "}
                  <b>
                    {statistic.cryptograms.by_century.centuries[
                      "Not solved"
                    ].reduce((a, b) => a + b, 0)}
                  </b>{" "}
                  are unsolved and{" "}
                  <b>
                    {statistic.cryptograms.by_century.centuries[
                      "Partially solved"
                    ].reduce((a, b) => a + b, 0)}
                  </b>{" "}
                  are solved only partially. Solved cryptograms cover{" "}
                  <b>{languages}</b> different languages. You can explore the
                  database using the <b>Cryptograms</b> menu option. For
                  statistics, visit the <b>Reports</b> menu option.
                </p>
              </div>
              <div className="space-y-4 border border-gray-100 rounded shadow p-3 flex flex-col items-center">
                <HiOutlineKey
                  className={"rounded-full text-gray-500 p-0.5 bg-gray-100"}
                  size={32}
                />
                <h3 className="text-2xl text-center font-bold leading-tight text-gray-900 dark:text-white">
                  Database of Cipher Keys
                </h3>
                <p className="font-sans text-start text-gray-500 dark:text-gray-400">
                  The database contains{" "}
                  <b>{statistic.global.count.cipher_keys}</b> cipher keys.
                  Cipher keys were obtained from{" "}
                  <b>{statistic.global.count.archives}</b> archives. The
                  youngest cipher key is dated{" "}
                  <b className={"whitespace-nowrap"}>
                    {statistic.cipher_keys.count.newest}
                  </b>{" "}
                  and the oldest cipher key is dated{" "}
                  <b className={"whitespace-nowrap"}>
                    {" "}
                    {statistic.cipher_keys.count.oldest}
                  </b>
                  . You can explore the database using the <b>Cipher Keys</b>{" "}
                  menu option. For statistics, visit the <b>Reports</b> menu
                  option.
                </p>
              </div>

              <div className="space-y-4 border border-gray-100 rounded shadow p-3 flex flex-col items-center">
                <HiServer
                  className={"rounded-full text-gray-500 p-0.5 bg-gray-100"}
                  size={32}
                />
                <h3 className="text-2xl text-center font-bold leading-tight text-gray-900 dark:text-white">
                  Entity Management
                </h3>
                <p className="font-sans text-start text-gray-500 dark:text-gray-400">
                  Our application provides tools to add, edit, and display
                  cryptograms and cipher keys. We are using a content management
                  system - the database records are reviewed by an
                  administrator. Only approved records will be visible in the
                  public database.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default WelcomePage;
