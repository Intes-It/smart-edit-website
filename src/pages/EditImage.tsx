import { Button } from "@mantine/core";
import IconUploadBlack from "../assets/icon_upload_black.svg";
import ImageRemoveBackground from "../assets/image-remove-background.png";
import IconTurnLeft from "../assets/icon-turn-left.svg";
import IconTurnRight from "../assets/icon-turn-right.svg";
import ArrowRight from "../assets/arrow-right-outline.png";
import AddOutline from "../assets/ion_add-outline.png";
const EditImage = () => {
  return (
    <div className="bg-white px-[200px] pt-10 pb-[118px]">
      <div
        style={{ boxShadow: "0px 2px 4px 0px #00000026" }}
        className="bg-[#F8F8F8] p-4"
      >
        <div
          style={{ border: " 1px dashed #000000" }}
          className="py-6 rounded-[8px] flex justify-center"
        >
          <Button
            className="text-black text-[20px]  w-[300px] h-[56px]  bg-white rounded-[40px] "
            style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
          >
            <img
              src={IconUploadBlack}
              alt=" upload"
              width={"28px"}
              height={"28px"}
              className="mr-1"
            />{" "}
            Upload image
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <img
          src={ImageRemoveBackground}
          alt=" image remove background"
          width={"100%"}
          height={"100%"}
        />
        <div className="mt-[68px] flex-row flex justify-between">
          <div className="flex flex-row gap-2">
            <div className="flex-col flex ">
              <img src={IconTurnLeft} alt="icon-turn-left" />
              <div className="text-[14px] text-[#A1A1A1] font-bold mx-auto mt-0.5">
                0
              </div>
            </div>

            <div className="flex-col flex ">
              <img src={IconTurnRight} alt="icon-turn-right" />
              <div className="text-[14px] text-[#A1A1A1] font-bold mx-auto mt-0.5">
                0
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div
              className="flex flex-row w-[140px] h-10 pl-4 pr-2 py-2.5 items-center rounded-[4px] mr-6"
              style={{ boxShadow: "0px 2px 8px 0px #00000026" }}
            >
              <p className="text-black text-[14px] font-medium">
                Continue Edit
              </p>{" "}
              <img
                src={ArrowRight}
                alt="arrow-right-outline"
                className="ml-2.5"
              />
            </div>
            <div
              className="flex flex-row w-[120px] h-10 px-2 py-2.5 items-center rounded-[4px]"
              style={{ boxShadow: "0px 2px 8px 0px #00000026" }}
            >
              <img
                src={AddOutline}
                alt="arrow-right-outline"
                className="mr-1"
              />
              <p className="text-black text-[14px] font-medium">New Image</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditImage;
