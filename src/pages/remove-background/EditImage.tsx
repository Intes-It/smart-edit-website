import { Button } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import axiosClient from "../../api/AxiosClient";
import ArrowRight from "../../assets/arrow-right-outline.png";
import IconUploadBlack from "../../assets/icon_upload_black.svg";
import ListFeature from "../../components/ListFeature";
import Loading from "../../components/Loading";
import PopupError from "../../components/PopupError";
import { useImageContext } from "../../contexts/imageContext";
import { compressImage } from "../../utils/comressImage";

const EditImage = () => {
  const imageContext = useImageContext();

  const [image, setImage] = useState<File | null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageRes, setImageRes] = useState<string | null>(
    typeof imageContext.image === "string" ? imageContext.image : null
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [isShowFeature, setIsShowFeature] = useState<boolean>(false);

  const navigate = useNavigate();
  const featureRef = useClickOutside(() => setIsShowFeature(false));

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = await compressImage(event.target.files?.[0] as File);

    if (uploadedFile) {
      setImage(uploadedFile);
      imageRes && setImageRes(null);
      handleRemoveBg(uploadedFile as File);
      imageContext.setImage(uploadedFile as File);
    }
  };

  const handleDragOver = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = await compressImage(
      event.dataTransfer.files[0] as File
    );
    // Check for image file type
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setImage(droppedFile);
      imageRes && setImageRes(null);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = await compressImage(
      event.dataTransfer.files[0] as File
    );

    // Check for image file type
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setImage(droppedFile);
      imageRes && setImageRes(null);
      handleRemoveBg(droppedFile as File);
      imageContext.setImage(droppedFile as File);
    }
  };

  const handleRemoveBg = async (image?: File) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("stype", "bgrem");
      formData.append("crop", true as any);

      if (image) formData.append("file", image as File);
      else if (imageContext.image)
        formData.append("file", imageContext.image as File);

      const res = await axiosClient.post("bgrem", formData);
      if (res.data.status === 200) {
        setImageRes(res.data?.result);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imageContext.image && imageRes === null) {
      handleRemoveBg();
    } else if (!imageContext.image && !image && !imageRes) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    let timeOut = null;
    if (isError) {
      timeOut = setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
    return () => clearTimeout(timeOut as any);
  }, [isError]);

  return (
    <div className="bg-white pt-10 pb-[118px] max-w-[1280px] mx-auto px-4">
      {isLoading && <Loading title="Working on your photo. Please wait" />}
      {isError && <PopupError title="Can not upload image" />}

      <input
        type="file"
        name="upload"
        onChange={handleUploadImage}
        multiple={false}
        id="upload"
        className="hidden"
        accept="image/png, image/jpeg"
      />
      <div
        style={{ boxShadow: "0px 2px 4px 0px #00000026" }}
        className="bg-[#F8F8F8] p-4"
      >
        <div
          style={{ border: " 1px dashed #000000" }}
          className="py-6 rounded-[8px] flex justify-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Button
            className="text-black text-[20px]  w-[300px] h-[56px]  bg-white rounded-[40px] "
            style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
          >
            <label
              htmlFor="upload"
              className="flex items-center h-full w-[300px] justify-center cursor-pointer "
            >
              <img
                src={IconUploadBlack}
                alt=" upload"
                width={"28px"}
                height={"28px"}
                className="mr-1"
              />{" "}
              Upload image
            </label>
          </Button>
        </div>
      </div>

      <div className="mt-8 ">
        <div className="min-h-[200px]">
          <img
            src={
              imageRes
                ? `data:image/jpeg;base64,${imageRes}`
                : (image || imageContext.image) &&
                  URL.createObjectURL(image || (imageContext.image as File))
            }
            alt=" image remove background"
            className="w-[1040px] h-[500px] object-contain mx-auto"
          />
        </div>

        <div className="mt-[68px]  flex-row flex justify-between">
          <div className="relative ml-auto" ref={featureRef}>
            <div
              className={twMerge(
                "absolute bottom-0 -left-64 invisible transition-all duration-300 ease-in-out opacity-0",
                isShowFeature && "visible opacity-100"
              )}
            >
              <ListFeature action={() => imageContext.setImage(imageRes)} />
            </div>
            <Button
              className="flex flex-row w-[140px] bg-white cursor-pointer h-10 pl-4 pr-2 py-2.5 items-center rounded-[4px] mr-6"
              style={{ boxShadow: "0px 2px 8px 0px #00000026" }}
              onClick={() => setIsShowFeature(!isShowFeature)}
            >
              <p className="text-black text-[14px] font-medium">
                Continue Edit
              </p>{" "}
              <img
                src={ArrowRight}
                alt="arrow-right-outline"
                className="ml-2.5"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditImage;
