import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const listTools = [
  {
    title: "Remove BG",
    hrf: "",
  },
  {
    title: "Remove Object",
    hrf: "",
  },
  {
    title: "Enhance",
    hrf: "",
  },
];

const ListHelps = [
  {
    title: "About us",
    hrf: "/about-us",
  },
  {
    title: "Terms of use",
    hrf: "terms-of-use",
  },
  {
    title: "Privacy policy",
    hrf: "privacy-policy",
  },
];

const Footer = () => {
  return (
    <footer
      className="w-full py-8 font-medium"
      style={{
        background: "linear-gradient(90.27deg, #C051F4 0.13%, #FF74BF 97.44%)",
      }}
    >
      <div className="max-w-[1440px] flex justify-between mx-auto gap-10 md:flex-row flex-col px-3">
        <div>
          <img src={logo} alt="logo" />
          <div className="mt-10 text-2xl text-white">
            Smart editing your photo with high AI technique
          </div>
        </div>
        <div className="flex justify-between md:gap-[100px] gap-6 sm:flex-row flex-col">
          <div className="flex flex-col text-[#F6E3F9] gap-3">
            <div className="text-white">Tools</div>
            {listTools.map((item) => (
              <Link to={item.hrf}>{item.title}</Link>
            ))}
          </div>
          <div className="flex flex-col text-[#F6E3F9] gap-3">
            <div className="text-white">Help</div>
            {ListHelps.map((item) => (
              <Link to={item.hrf}>{item.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
