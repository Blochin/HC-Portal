import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

function NoPage() {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600 mb-3">
          Oops! The page you are looking for could not be found.
        </p>
        <Link className={"flex flex-row justify-center"} to={"/"}>
          <Button> Go back to Home </Button>
        </Link>
      </div>
    </div>
  );
}
export default NoPage;
