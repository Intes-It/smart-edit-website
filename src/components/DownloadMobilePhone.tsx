import AppStore from "../assets/appstore.png";
import Googleplay from "../assets/googleplay.png";
const DownloadMobilePhone = () => {
  return (
    <div className="bg-white pt-[17px]  px-20">
      <div className="bg-[#F5EBFF] p-10 rounded-[32px] flex flex-wrap justify-between">
        <div className="flex flex-col w-1/2">
          <div className="text-[32px] text-[#383E42] font-semibold mb-5">
            Download SmartEdit on mobile phone
          </div>
          <div className="text-[20px] text-[#000] font-normal">
            Use SmartEdit more convenient on iOS & Android{" "}
          </div>
        </div>
        <div className="flex flex-wrap gap-8 left-0  my-[15px] mr-1.5 ">
          <img
            src={AppStore}
            alt="icon-appstore"
            width={"180px"}
            height={"auto"}
          />
          <img
            src={Googleplay}
            alt="icon-chplay"
            width={"180px"}
            height={"auto"}
          />
        </div>
      </div>
    </div>
  );
};
export default DownloadMobilePhone;