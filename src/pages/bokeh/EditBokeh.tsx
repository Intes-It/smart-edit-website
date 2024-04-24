import { Button, Slider } from "@mantine/core";
import { useState } from "react";
import ArrowRight from "../../assets/arrow-right-outline.png";
import IconUploadBlack from "../../assets/icon_upload_black.svg";
import imageBokehEdit from "../../assets/image-bokeh-edit.png";

const EditImage = () => {
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);
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
        className="flex flex-row mt-8"
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
          className="flex flex-col items-center justify-between w-1/5"
        >
          <div>
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Horizontal
            </div>
            <Slider
              value={horizontal}
              onChange={setHorizontal}
              className="w-[276px] h-[24px] mt-2 "
            />
            <div
              className="ml-auto mt-1 w-[60px] h-[30px] bg-white text-black text-[14px] font-normal flex justify-center items-center rounded"
              style={{ border: "1px solid #DBDADA" }}
            >
              {horizontal}%
            </div>
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Vertical
            </div>
            <Slider
              value={vertical}
              onChange={setVertical}
              className="w-[276px] h-[24px] mt-2 "
            />
            <div
              className="ml-auto mt-1 w-[60px] h-[30px] bg-white text-black text-[14px] font-normal flex justify-center items-center rounded"
              style={{ border: "1px solid #DBDADA" }}
            >
              {vertical}%
            </div>
          </div>
          <div>
            <Button
              className="text-white text-[14px] w-[140px]  border-none outline-none h-[40px]   rounded  mb-4  "
              style={{
                background: "linear-gradient(180deg, #8151E6 0%, #FD7BA3 100%)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M10.4608 13.755C10.4022 13.819 10.331 13.8702 10.2516 13.9052C10.1721 13.9402 10.0863 13.9582 9.99954 13.9582C9.91276 13.9582 9.82693 13.9402 9.74751 13.9052C9.6681 13.8702 9.59685 13.819 9.53829 13.755L6.20495 10.1092C6.09573 9.98642 6.03924 9.8256 6.04771 9.66151C6.05617 9.49743 6.1289 9.34327 6.25017 9.23241C6.37144 9.12155 6.53148 9.0629 6.69567 9.06916C6.85985 9.07541 7.01497 9.14607 7.12745 9.26583L9.37412 11.7242V2.5C9.37412 2.33424 9.43997 2.17527 9.55718 2.05806C9.67439 1.94085 9.83336 1.875 9.99912 1.875C10.1649 1.875 10.3239 1.94085 10.4411 2.05806C10.5583 2.17527 10.6241 2.33424 10.6241 2.5V11.7233L12.8716 9.265C12.9836 9.14267 13.1395 9.06982 13.3052 9.06247C13.4708 9.05513 13.6326 9.11389 13.755 9.22583C13.8773 9.33778 13.9501 9.49373 13.9575 9.65939C13.9648 9.82505 13.9061 9.98684 13.7941 10.1092L10.4608 13.755Z"
                  fill="white"
                />
                <path
                  d="M3.125 12.5C3.125 12.3342 3.05915 12.1753 2.94194 12.0581C2.82473 11.9408 2.66576 11.875 2.5 11.875C2.33424 11.875 2.17527 11.9408 2.05806 12.0581C1.94085 12.1753 1.875 12.3342 1.875 12.5V12.5458C1.875 13.685 1.875 14.6042 1.9725 15.3267C2.0725 16.0767 2.28917 16.7083 2.79 17.21C3.29167 17.7117 3.92333 17.9267 4.67333 18.0283C5.39583 18.125 6.315 18.125 7.45417 18.125H12.5458C13.685 18.125 14.6042 18.125 15.3267 18.0283C16.0767 17.9267 16.7083 17.7117 17.21 17.21C17.7117 16.7083 17.9267 16.0767 18.0283 15.3267C18.125 14.6042 18.125 13.685 18.125 12.5458V12.5C18.125 12.3342 18.0592 12.1753 17.9419 12.0581C17.8247 11.9408 17.6658 11.875 17.5 11.875C17.3342 11.875 17.1753 11.9408 17.0581 12.0581C16.9408 12.1753 16.875 12.3342 16.875 12.5C16.875 13.6958 16.8733 14.53 16.7892 15.16C16.7067 15.7717 16.5558 16.095 16.3258 16.3258C16.095 16.5567 15.7717 16.7067 15.1592 16.7892C14.53 16.8733 13.6958 16.875 12.5 16.875H7.5C6.30417 16.875 5.46917 16.8733 4.84 16.7892C4.22833 16.7067 3.905 16.5558 3.67417 16.3258C3.44333 16.095 3.29333 15.7717 3.21083 15.1592C3.12667 14.53 3.125 13.6958 3.125 12.5Z"
                  fill="white"
                />
              </svg>
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
