import { Button, Slider } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import axiosClient from "../../api/AxiosClient";
import ArrowRight from "../../assets/arrow-right-outline.png";
import iconDownload from "../../assets/icon/icon-download.svg";
import IconUploadBlack from "../../assets/icon_upload_black.svg";
import ListFeature from "../../components/ListFeature";
import Loading from "../../components/Loading";
import PopupError from "../../components/PopupError";
import { useImageContext } from "../../contexts/imageContext";
import { compressImage } from "../../utils/comressImage";
const EditImage = () => {
  const [blur, setBlurl] = useState(0);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
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
      formData.append("crop", false as any);

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

  const mergeImages = (imageUrl: string, imageRes: string) => {
    return new Promise((resolve) => {
      const newImage = new Image();
      newImage.src = imageUrl;

      newImage.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = newImage.width;
        canvas.height = newImage.height;
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(newImage, 0, 0);
          const imageResImage = new Image();
          imageResImage.src = `data:image/jpeg;base64,${imageRes}`;

          imageResImage.onload = function () {
            context.drawImage(imageResImage, 0, 0);
            const finalImageUrl = canvas.toDataURL("image/png");
            resolve(finalImageUrl);
          };
        }
      };
    });
  };
  const downloadImage = async () => {
    const image1 = new Image();
    image1.src = imageContext.image
      ? URL.createObjectURL(imageContext.image as File)
      : "";
    image1.onload = () => {
      const lowerCanvas = document.createElement("canvas");
      lowerCanvas.width = image1.width;
      lowerCanvas.height = image1.height;
      const filteredLowerContext = lowerCanvas.getContext("2d");
      if (filteredLowerContext) {
        filteredLowerContext.filter = `
              blur(${blur / 10}px) 
              brightness(${brightness + 50}%) 
              contrast(${contrast + 50}%)
              grayscale(${grayscale}%)
              sepia(${sepia}%)
            `;
        filteredLowerContext.drawImage(image1, 0, 0);

        const imageUrl = lowerCanvas.toDataURL("image/png");
        mergeImages(imageUrl, imageRes as string).then((newImg) => {
          const link = document.createElement("a");
          link.href = newImg as string;
          link.download = "image.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }
    };
  };

  return (
    <div className="bg-white px-[200px] pt-10 pb-[118px]">
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
        className="flex flex-row mt-8 min-h-[500px]"
        style={{
          boxShadow: "0px 2px 4px 0px #00000026",
        }}
      >
        <div className="w-4/5 flex justify-center py-[42px] relative image-container ">
          {/* <div
            style={{
              backgroundImage: `url(${
                
              })`,
              height: "400px",
            }}
            className="absolute object-contain bg-cover w-fit blur-bg-img"
          > */}
          <img
            src={
              (image || imageContext.image) &&
              URL.createObjectURL(image || (imageContext.image as File))
            }
            alt=" image remove background"
            className=" w-fit h-[400px] absolute"
            style={{
              filter: `
              blur(${blur / 10}px) 
              brightness(${brightness + 50}%) 
              contrast(${contrast + 50}%)
              grayscale(${grayscale}%)
              sepia(${sepia}%)
              `,
            }}
            id="lower-image"
          />
          <img
            src={imageRes ? `data:image/jpeg;base64,${imageRes}` : ""}
            alt=" image remove background"
            className=" w-fit h-[400px] absolute  "
            id="upper-image"
          />
        </div>
        <div
          style={{ borderLeft: "1px solid #F1F0F0" }}
          className="flex flex-col items-center justify-between w-1/5"
        >
          <div>
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Blur
            </div>
            <Slider
              value={blur}
              onChange={setBlurl}
              className="w-[276px] h-[24px] mt-2 "
            />
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Brightness
            </div>
            <Slider
              value={brightness}
              onChange={setBrightness}
              className="w-[276px] h-[24px] mt-2 "
            />
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Contrast
            </div>
            <Slider
              value={contrast}
              onChange={setContrast}
              className="w-[276px] h-[24px] mt-2 "
            />
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Grayscale
            </div>
            <Slider
              value={grayscale}
              onChange={setGrayscale}
              className="w-[276px] h-[24px] mt-2 "
            />
            <div className="text-[14px] text-[#424242] font-medium mr-auto ml-3">
              Sepia
            </div>
            <Slider
              value={sepia}
              onChange={setSepia}
              className="w-[276px] h-[24px] mt-2 "
            />
          </div>
          <div>
            <Button
              className="text-white text-[14px]  w-[140px] h-[40px]   rounded-[4px]  mb-4  "
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
    </div>
  );
};
export default EditImage;
