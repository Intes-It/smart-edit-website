import AppStore from "../assets/appstore.png";
import Googleplay from "../assets/googleplay.png";
const DownloadMobilePhone = () => {
  return (
    <div className="bg-white pt-[45px]  px-20 mb-[95px]">
      <div className="bg-[#F5EBFF] p-10 rounded-[32px] flex flex-wrap justify-between">
        <div className="flex flex-col w-1/2">
          <div className="text-[32px] text-[#383E42] font-semibold mb-5">
            Download SmartEdit on mobile phone
          </div>
          <div className="text-[20px] text-[#000] font-normal">
            Use SmartEdit more convenient on iOS & Android{" "}
          </div>
        </div>
        <div className="flex flex-wrap gap-8 left-0  my-auto mr-1.5 ">
          <img
            src={AppStore}
            alt="icon-appstore"
            width={"180px"}
            className="cursor-not-allowed"
          />
          <a href="https://play.google.com/store/apps/details?id=com.abi.remove.plus.background&hl=vi&gl=US">
            <img
              src={Googleplay}
              alt="icon-chplay"
              width={"180px"}
              className=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};
export default DownloadMobilePhone;
