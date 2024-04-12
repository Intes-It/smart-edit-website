import { Button } from "@mantine/core";
import IconUpload from "../assets/picture_upload.svg";
import BeforeAfter from "../assets/picture_before_after.svg";
import ImageUser from "../assets/imageUser.png";

const UploadImage = () => {
  const listpictures = [
    {
      avatar: ImageUser,
    },
    {
      avatar: ImageUser,
    },
    {
      avatar: ImageUser,
    },
    {
      avatar: ImageUser,
    },
  ];
  return (
    <div className="bg-[#F5EBFF] px-[80px] py-[97px] flex flex-wrap">
      <div className="w-3/5 flex flex-col pl-[106px] pr-[62px]">
        <div className="font-bold text-[40px] mb-[46px]">
          Blur background to highlight main image’s character
        </div>
        <div className="bg-white pt-[47px] pb-[40px] flex flex-col rounded-[20px] items-center">
          <Button className="text-white text-[20px] leading-[23.44px] w-[404px] h-[72px]  bg-[#A451E6] rounded-[40px]  ">
            <img
              src={IconUpload}
              alt=" upload"
              width={"28px"}
              height={"28px"}
              className="mr-1"
            />{" "}
            Upload image
          </Button>
          <div className="text-[20px] text-black font-medium mt-3 mb-8">
            Or drop your image here
          </div>
          <div className="text-[#4B4B4B] text-16px font-normal">
            Try our sample image
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            {listpictures?.map((item, index) => (
              <img src={item.avatar} alt="image" key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-2/5">
        <img src={BeforeAfter} alt=" before-after" />
      </div>
    </div>
  );
};
export default UploadImage;
