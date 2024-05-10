import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import iconDropdown from "../assets/icon/dropdown.svg";
import flagEngland from "../assets/icon/flag-united-kingdom.svg";
import logo from "../assets/logo.png";
import ListFeature from "../components/ListFeature";

const Header = () => {
  return (
    <header
      className="h-[68px] w-full sticky top-0 bg-white z-50"
      style={{
        boxShadow: "0px 2px 4px 0px #0000001A",
      }}
    >
      <div className="flex items-center whitespace-nowrap justify-between font-semibold text-[#4B4B4B] h-full mx-auto md:px-5 px-3">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="cursor-pointer" />
          </Link>
          <div className="items-center hidden ml-20 md:flex">
            <div className="flex items-center relative gap-3 group px-4 py-2 transition duration-300 ease-in-out rounded-lg cursor-pointer hover:bg-[#FAF5FF] hover:text-primary">
              Feature
              <svg
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.53015 0.970032C9.6706 1.11066 9.74949 1.30128 9.74949 1.50003C9.74949 1.69878 9.6706 1.88941 9.53015 2.03003L5.53015 6.03003C5.38953 6.17048 5.1989 6.24937 5.00015 6.24937C4.8014 6.24937 4.61078 6.17048 4.47015 6.03003L0.470153 2.03003C0.396466 1.96137 0.337364 1.87857 0.296372 1.78657C0.25538 1.69457 0.233339 1.59526 0.231562 1.49455C0.229785 1.39385 0.24831 1.29382 0.286031 1.20043C0.323752 1.10705 0.379896 1.02221 0.451115 0.950994C0.522334 0.879775 0.607168 0.82363 0.700556 0.785909C0.793944 0.748188 0.893973 0.729663 0.994676 0.73144C1.09538 0.733217 1.19469 0.755259 1.28669 0.796251C1.37869 0.837243 1.46149 0.896345 1.53015 0.970032L5.00015 4.44003L8.47015 0.970032C8.61078 0.829582 8.8014 0.750692 9.00015 0.750692C9.1989 0.750692 9.38953 0.829582 9.53015 0.970032Z"
                  fill="currentColor"
                />
              </svg>
              <div
                className="absolute top-14 text-[#4B4B4B] left-0 opacity-0 invisible group-hover:visible transition-all duration-300 ease-in-out group-hover:cursor-auto group-hover:opacity-100 rounded bg-white w-[240px] z-10"
                style={{
                  boxShadow: "0px 0px 2px 0px #00000026",
                }}
              >
                <ListFeature isHeader />
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 transition duration-300 ease-in-out hover:bg-[#FAF5FF] cursor-pointer rounded-lg">
              Pricing
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.abi.remove.plus.background&hl=vi&gl=US"
              className="flex items-center gap-3 px-4 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FAF5FF] rounded-lg"
            >
              Download App
            </a>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center gap-2 px-4 cursor-pointer">
            <img src={flagEngland} alt="flag" />
            <span className="hidden sm:flex">English</span>
            <img src={iconDropdown} alt="flag" />
          </div>
          <Link to="/login">
            <Button
              style={{
                height: 40,
              }}
              className="self-center px-6 py-2 ml-4 text-white rounded-lg cursor-pointer bg-primary"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
