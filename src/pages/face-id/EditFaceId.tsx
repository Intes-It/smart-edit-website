import { Button } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import html2canvas, { Options } from "html2canvas";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { twMerge } from "tailwind-merge";
import axiosClient from "../../api/AxiosClient";
import ArrowRight from "../../assets/arrow-right-outline.png";
import backGroundCaro from "../../assets/back-ground-caro.jpg";
import iconDownload from "../../assets/icon/icon-download.svg";
import IconUploadBlack from "../../assets/icon_upload_black.svg";
import ListFeature from "../../components/ListFeature";
import Loading from "../../components/Loading";
import PopupError from "../../components/PopupError";
import { useImageContext } from "../../contexts/imageContext";
import { compressImage } from "../../utils/comressImage";

const EditFaceId = () => {
  const imageContext = useImageContext();

  const [image, setImage] = useState<File | null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageRes, setImageRes] = useState<string | null>(
    typeof imageContext.image === "string" ? imageContext.image : null
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [isShowFeature, setIsShowFeature] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState(0);
  const [imageSize, setImageSize] = useState(0);
  const listBgColors: string[] = [
    "#ffffff",
    "#2050E5",
    "#88A9F4",
    "#000000",
    "#AEAEB5",
  ];
  const listImageSizes = [
    {
      unit: "cm",
      text: "4x6",
      width: "240px",
      height: "360px",
    },
    {
      unit: "cm",
      text: "3,5x4,5",
      width: "310px",
      height: "360px",
    },
    {
      unit: "cm",
      text: "3x4",
      width: "300px",
      height: "360px",
    },
    {
      unit: "cm",
      text: "2x3",
      width: "240px",
      height: "360px",
    },
    {
      unit: "cm",
      text: "4x5",
      width: "320px",
      height: "360px",
    },
    {
      unit: "cm",
      text: "5x7",
      width: "260px",
      height: "360px",
    },
    {
      unit: "inches",
      text: "1,5x1,5",
      width: "300px",
      height: "300px",
    },
    {
      unit: "inches",
      text: "2x2",
      width: "300px",
      height: "300px",
    },
  ];
  const navigate = useNavigate();
  const featureRef = useClickOutside(() => setIsShowFeature(false));

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = await compressImage(event.target.files?.[0] as File);

    if (uploadedFile) {
      setImage(uploadedFile);
      imageRes && setImageRes(null);
      handleMoveBackground(uploadedFile as File);
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
      handleMoveBackground(droppedFile as File);
      imageContext.setImage(droppedFile as File);
    }
  };

  const handleMoveBackground = async (image?: File) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("stype", "bgrem");
      formData.append("crop", true as any);

      if (image) formData.append("file", image as File);
      else if (imageContext.image)
        formData.append("file", imageContext.image as File);

      const res = await axiosClient.post("bgrem/", formData);
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
      handleMoveBackground();
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

  const downloadImage = async () => {
    const container = document.getElementById("my-div-id");
    if (!container) {
      console.error("Container element not found");
      return;
    }
    try {
      const options: Partial<Options> = {
        // preserveDrawingBuffer: true,
        width: container.offsetWidth,
        height: container.offsetHeight,
        scale: 1,
      };
      const canvas = await html2canvas(container, options);

      // Tạo hình ảnh từ canvas và tải xuống
      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

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

      <div
        className="flex flex-row mt-8 "
        style={{
          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="min-h-[200px] py-10  mx-auto ">
          <div
            style={{
              backgroundImage: `url(${backGroundCaro})`,
            }}
            className="w-[380px] h-[415px] bg-no-repeat bg-cover flex items-center"
          >
            <TransformWrapper initialScale={1} minScale={1} maxScale={3}>
              {() => (
                <div
                  style={{
                    width: listImageSizes[imageSize].width,
                    height: listImageSizes[imageSize].height,
                    backgroundColor: listBgColors[bgColor],
                  }}
                  className="flex items-center justify-center mx-auto overflow-hidden bg-cover "
                  id="my-div-id"
                >
                  <TransformComponent>
                    <img
                      src={
                        imageRes
                          ? `data:image/jpeg;base64,${imageRes}`
                          : (image || imageContext.image) &&
                            URL.createObjectURL(
                              image || (imageContext.image as File)
                            )
                      }
                      style={{
                        height: listImageSizes[imageSize].height,
                        width: listImageSizes[imageSize].width,
                      }}
                      alt=" image remove background  "
                      className="object-contain w-fit"
                    />
                  </TransformComponent>
                </div>
              )}
            </TransformWrapper>
          </div>
        </div>

        <div
          className="flex flex-col px-3 pt-4 pb-6 "
          style={{ borderLeft: "1px solid rgba(241, 240, 240, 1)" }}
        >
          <div className="text-[rgba(66, 66, 66, 1)] font-medium text-[14px] mb-4">
            Choose background color
          </div>
          <div className="flex flex-row gap-2">
            {listBgColors?.map((item, index) => (
              <div
                className="w-10 h-10 rounded"
                style={{
                  backgroundColor: item,
                  border: index === bgColor ? "2px solid #FD7BA3" : "none",
                  boxShadow: "0px 2px 4px 0px #00000026",
                }}
                onClick={() => {
                  setBgColor(index);
                }}
              ></div>
            ))}
          </div>
          <div className="text-[rgba(66, 66, 66, 1)] font-medium text-[14px] mb-3 mt-8">
            Choose image size
          </div>

          <div className="grid grid-cols-4 gap-2">
            {listImageSizes?.map((item, index) => (
              <div
                className="w-[64px] h-[64px] rounded-[5px] flex flex-col text-[16px] text-[#424242] font-medium justify-center"
                style={{
                  boxShadow: "0px 2px 8px 0px #00000026",
                  cursor: "pointer",
                  border: imageSize === index ? "2px solid #FD7BA3" : "none",
                }}
                onClick={() => {
                  setImageSize(index);
                }}
              >
                <div className="mx-auto mb-[2px]">{item.text}</div>
                <div className="mx-auto text-[12px]">{item.unit}</div>
              </div>
            ))}
          </div>
          <Button
            className="text-white text-[14px]  w-[140px] h-[40px]   rounded-[4px]  mb-4 mt-[auto]  mx-auto"
            style={{
              background: "linear-gradient(180deg, #8151E6 0%, #FD7BA3 100%)",
            }}
            onClick={() => {
              downloadImage();
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
          <div className="relative mx-auto " ref={featureRef}>
            <div
              className={twMerge(
                "absolute bottom-0 -left-64 invisible transition-all duration-300 ease-in-out opacity-0",
                isShowFeature && "visible opacity-100"
              )}
            >
              <ListFeature action={() => imageContext.setImage(imageRes)} />
            </div>
            <Button
              className="flex flex-row w-[140px] bg-white cursor-pointer h-10 pl-4 pr-2 py-2.5 items-center rounded-[4px] "
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
export default EditFaceId;
