import { useEffect, useState } from "react";
import CustomNavbar from "../components/Navbar";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [clipPathImage, setClipPathImage] = useState(
    "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
  );
  const [clipPathDescription, setClipPathDescription] = useState(
    "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  );

  useEffect(() => {
    const updateClipPaths = () => {
      const isSmallScreen = window.innerWidth < 640;

      setClipPathImage(
        isSmallScreen ? "none" : "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
      );
      setClipPathDescription(
        isSmallScreen ? "none" : "polygon(20% 0, 0 100%, 100% 100%, 100% 0)",
      );
    };

    updateClipPaths(); // Initial update

    window.addEventListener("resize", updateClipPaths);

    return () => {
      window.removeEventListener("resize", updateClipPaths);
    };
  }, []);

  return (
    <div>
      <CustomNavbar />
      <div className="flex flex-col sm:flex-row justify-between p-4">
        <div
          className="relative overflow-hidden w-full sm:w-1/2 md:w-1/2 lg:w-2/3"
          style={{ clipPath: clipPathImage }}
        >
          <img
            src="/landingPage.png"
            alt="Your Image"
            className="w-full h-full object-cover lg:h-1/2"
          />
        </div>

        <div
          className="mr-4 flex flex-col gap-3 w-full sm:w-1/2 md:w-1/2 lg:w-1/3"
          style={{
            shapeOutside: clipPathDescription,
          }}
        >
          <h1 className="font-bold">Welcome to HC Portal</h1>
          <h2> Portal of Historical Ciphers</h2>
          <div>
            The Portal of Historical Ciphers (HCPortal) is a gateway to the
            world of historical ciphers. You can find a comprehensive database
            of cryptograms, useful tools, and many more. The front-end of this
            portal was designed to provide a responsive and modern UI/UX. We
            used technologies built for the modern web. The major part of the
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            portal's back-end is also available as a public API.
          </div>
          <div className="flex flex-row gap-3">
            <Button onClick={() => navigate(`/dashboard`)} size={"xs"}>
              Get Started
            </Button>
            <Button size={"xs"}>Registration</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
