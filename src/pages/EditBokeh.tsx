import { Button, Slider } from "@mantine/core";
import IconUploadBlack from "../assets/icon_upload_black.svg";
import imageBokehEdit from "../assets/image-bokeh-edit.png";
import iconDownload from "../assets/icon/icon-download.svg";

import ArrowRight from "../assets/arrow-right-outline.png";
import { useState } from "react";
const EditImage = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
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
      <div
        className="mt-8 flex flex-row"
        style={{
          boxShadow: "0px 2px 4px 0px #00000026",
        }}
      >
        <div className="w-4/5 flex justify-center mt-[42px] mb-[140px]">
          <img
            src={imageBokehEdit}
            alt=" image remove background"
            width={"440px"}
            height={"318px"}
          />
        </div>
        <div
          style={{ borderLeft: "1px solid #F1F0F0" }}
          className="w-1/5 flex flex-col items-center justify-between"
        >
          <div>
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Horizontal
            </div>
            <Slider
              value={value1}
              onChange={setValue1}
              className="w-[276px] h-[24px] mt-2 "
            />
            <div
              className="ml-auto mt-1 w-[60px] h-[30px] bg-white text-black text-[14px] font-normal flex justify-center items-center rounded"
              style={{ border: "1px solid #DBDADA" }}
            >
              {value1}%
            </div>
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Vertical
            </div>
            <Slider
              value={value2}
              onChange={setValue2}
              className="w-[276px] h-[24px] mt-2 "
            />
            <div
              className="ml-auto mt-1 w-[60px] h-[30px] bg-white text-black text-[14px] font-normal flex justify-center items-center rounded"
              style={{ border: "1px solid #DBDADA" }}
            >
              {value2}%
            </div>
          </div>
          <div>
            <Button
              className="text-white text-[14px]  w-[140px] h-[40px]   rounded-[4px]  mb-4  "
              style={{
                background: "linear-gradient(180deg, #8151E6 0%, #FD7BA3 100%)",
              }}
            >
              <img
                src={iconDownload}
                alt="icon-download"
                width={"20px"}
                height={"20px"}
                className="mr-1"
              />{" "}
              Download
            </Button>
            <div
              className="flex flex-row w-[140px] h-10 pl-4 pr-2 py-2.5 items-center rounded-[4px] mr-6 mb-6 "
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditImage;
