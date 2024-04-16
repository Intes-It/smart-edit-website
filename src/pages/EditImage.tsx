import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import axiosClient from "../api/AxiosClient";
import ArrowRight from "../assets/arrow-right-outline.png";
import IconTurnLeft from "../assets/icon-turn-left.svg";
import IconTurnRight from "../assets/icon-turn-right.svg";
import IconUploadBlack from "../assets/icon_upload_black.svg";
import AddOutline from "../assets/ion_add-outline.png";
import Loading from "../components/Loading";
import { useImageContext } from "../contexts/imageContext";

const EditImage = () => {
  const imageContext = useImageContext();

  const [image, setImage] = useState<File | null | any>(null);
  const [imageRes, setImageRes] = useState<string | null>(null);

  const handleEdit = async () => {
    try {
      const formData = new FormData();

      formData.append("stype", "bgrem");
      formData.append("crop", true as any);
      formData.append("file", imageContext.image as File);

      console.log("formData", formData);

      const res = await axiosClient.post("bgrem", formData);
      if (res.status === 200) {
        setImageRes(res.data?.result);
      }
      console.log("res", res);
    } catch (error) {}
  };

  useEffect(() => {
    if (imageContext.image) {
      handleEdit();
    }
  }, [imageContext.image]);

  return (
    <div className="bg-white px-[200px] pt-10 pb-[118px]">
      <Loading title="Working on your photo. Please wait" />
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
      {imageRes && <img src={`data:image/jpeg;base64,${imageRes}`} />}
      <div className="mt-8 ">
        <div className=" min-h-[200px]">
          {(image || imageContext.image) && (
            <img
              src={imageContext.image || image}
              alt=" image remove background"
              className="w-[1040px] h-[500px] object-cover"
              width={"100%"}
              height={"100%"}
            />
          )}
        </div>
        <div className="mt-[68px] flex-row flex justify-between">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col ">
              <img src={IconTurnLeft} alt="icon-turn-left" />
              <div className="text-[14px] text-[#A1A1A1] font-bold mx-auto mt-0.5">
                0
              </div>
            </div>

            <div className="flex flex-col ">
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
