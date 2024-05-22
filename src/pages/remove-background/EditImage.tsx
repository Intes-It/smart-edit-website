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
import { handleDownload } from "../../utils/convertImage";

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

      const res = await axiosClient.post("/apx/bgrem/", formData);
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
    let timeOut = null as any;
    if (isError) {
      timeOut = setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
    return () => clearTimeout(timeOut);
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

        <div className="mt-[68px] flex gap-5 justify-end">
          {imageRes && (
            <Button
              className="text-white text-[14px] w-[140px]  border-none outline-none h-[40px]   rounded  mb-4  "
              style={{
                background: "linear-gradient(180deg, #8151E6 0%, #FD7BA3 100%)",
              }}
              onClick={() => handleDownload(imageRes)}
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
          )}
          <div className="relative " ref={featureRef}>
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
