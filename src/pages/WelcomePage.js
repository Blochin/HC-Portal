import { HiArchive, HiOutlineKey } from "react-icons/hi";
import { HiServer } from "react-icons/hi2";

function WelcomePage() {
  return (
    <section className="antialiased">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            Our work
          </h2>
          <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Welcome to the HC Portal database of cryptograms and cipher keys
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
              The database contains <b>1313 cryptograms.</b> Among them, 516 are
              unsolved and 5 are solved only partially. Solved cryptograms cover
              10 different languages. Use the available menu option to explore
              the cryptograms.
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
              Our database contains cipher keys with detailed informations. You
              can contribute to our database with adding more cipher keys after
              registration.
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
              Our application provides features to manage cryptograms and cipher
              keys between other people. There are several kinds of tools to
              upload an entity with metadata. Once checked, they will be visible
              in our database.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
