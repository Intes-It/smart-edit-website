import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import IconUpload from "../assets/picture_upload.svg";
import { useImageContext } from "../contexts/imageContext";
import { UploadImageProps } from "../types";

const UploadImage = ({
  optionsImage,
  title,
  imageBanner,
}: UploadImageProps) => {
  const { setImage } = useImageContext();

  const navigate = useNavigate();

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setImage(uploadedFile);
      navigate("edit");
      // Process the uploaded file (e.g., read contents, upload to server)
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    // Check for image file type
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setImage(droppedFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer?.files[0];

    // Check for image file type
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setImage(droppedFile);
    }
  };

  return (
    <div className="bg-[#F5EBFF] py-[97px] flex ">
      <div className="flex flex-wrap max-w-[1280px] w-full justify-between mx-auto px-[10px]">
        <div className="flex flex-col w-3/5 max-w-[584px]">
          <div className="font-bold text-[40px] mb-[46px]">{title}</div>
          <div
            className="bg-white pt-[47px] pb-[40px] flex flex-col rounded-[20px] items-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Button className="text-white text-[20px] leading-[23.44px] w-[404px] h-[72px]  bg-[#A451E6] rounded-[40px]  ">
              <label
                htmlFor="upload"
                className="z-40 flex justify-center w-[404px] flex items-center h-[70px] cursor-pointer"
              >
                <img
                  src={IconUpload}
                  alt=" upload"
                  width={"28px"}
                  height={"28px"}
                  className="mr-1"
                />{" "}
                Upload image
              </label>
            </Button>
            <input
              type="file"
              name="upload"
              onChange={handleUploadImage}
              id="upload"
              className="hidden"
              accept="image/png, image/jpeg"
            />
            <div className="text-[20px] text-black font-medium mt-3 mb-8">
              Or drop your image here
            </div>
            <div className="text-[#4B4B4B] text-16px font-normal">
              Try our sample image
            </div>
            <div className="flex flex-wrap gap-4 mt-3">
              {optionsImage?.map((item, index) => (
                <img
                  src={item}
                  alt="image"
                  className="w-12 h-12 rounded-md"
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <img src={imageBanner} alt=" before-after" />
        </div>
      </div>
    </div>
  );
};
export default UploadImage;
