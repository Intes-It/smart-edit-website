import { Button, Modal, ScrollArea } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { ChangeEvent, DragEvent, Key, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import axiosClient, { API_URL } from "../../api/AxiosClient";
import ArrowRight from "../../assets/arrow-right-outline.png";
import iconArrowRightBlue from "../../assets/icon/icon-arrow-right-blue.svg";
import iconBodyActive from "../../assets/icon/icon-body-active.svg";
import iconBody from "../../assets/icon/icon-body.svg";
import iconCameraPlus from "../../assets/icon/icon-camera-plus.svg";
import iconDownload from "../../assets/icon/icon-download.svg";
import iconFaceActive from "../../assets/icon/icon-face-active.svg";
import iconFace from "../../assets/icon/icon-face.svg";
import galleryIcon from "../../assets/icon/icon-gallery-wide.svg";
import photoIcon from "../../assets/icon/icon-photo-active.svg";
import iconRefresh from "../../assets/icon/icon-refresh.svg";
import IconUploadBlack from "../../assets/icon_upload_black.svg";
import ListFeature from "../../components/ListFeature";
import Loading from "../../components/Loading";
import PopupError from "../../components/PopupError";
import { useImageContext } from "../../contexts/imageContext";
import { compressImage } from "../../utils/comressImage";
import { handleDownload, imageUrlToFile } from "../../utils/convertImage";

const EditFaceChange = () => {
  const imageContext = useImageContext();

  const [opened, { open, close }] = useDisclosure(false);

  const [selectType, setSelectType] = useState(2);
  const [step, setStep] = useState<number>(1);

  const [imageRes, setImageRes] = useState(null);
  const [imageBody, setImageBody] = useState<File | null | Blob | any>(
    typeof imageContext.image === "string"
      ? `data:image/jpeg;base64,${imageContext.image}`
      : null
  );
  const [imageFace, setImageFace] = useState<File | null | Blob | any>(null);
  const [listImages, setListImages] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isShowFeature, setIsShowFeature] = useState<boolean>(false);

  const featureRef = useClickOutside(() => setIsShowFeature(false));

  const getListImageBody = async () => {
    try {
      const res = await axiosClient.get("/api/list_image_body");
      if (res.status === 200) {
        setListImages(res.data?.result);
        if (!imageBody && !imageContext)
          setImageBody(`${API_URL}/${res.data.result[0]?.list[0]}`);
      }
    } catch (error) {
      alert(String(error));
    }
  };

  const handleUserUploadImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = await compressImage(event.target.files?.[0] as File);

    if (uploadedFile) {
      setImageFace(uploadedFile);

      if (imageBody && uploadedFile) handleFaceChange(uploadedFile as File);
    }
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = await compressImage(event.target.files?.[0] as File);

    if (uploadedFile) {
      setImageBody(uploadedFile);
    }
  };

  const handleDragOver = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = await compressImage(
      event.dataTransfer.files[0] as File
    );
    // Check for image file type
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setImageBody(droppedFile);
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = await compressImage(
      event.dataTransfer.files[0] as File
    );

    // Check for image file type
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setImageBody(droppedFile);
    }
  };

  const handleFaceChange = async (
    newImageFace?: File,
    newImageBody?: string | File
  ) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      const targetFile =
        typeof newImageBody === "string" || typeof imageBody === "string"
          ? await imageUrlToFile(newImageBody || imageBody, "body-change")
          : newImageBody || imageBody;

      formData.append("stype", "swap_face");
      formData.append("source", (newImageFace as File) || imageFace);
      formData.append("target", targetFile);

      const res = await axiosClient.post("/api/swap_face/", formData);
      if (res.data?.status === 200) {
        setImageRes(res.data?.result);
        setStep(2);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeImage = async (url: string) => {
    url = new URL(`${API_URL}/${url}`).toString();
    setImageBody(url);

    if (url && imageFace) {
      handleFaceChange(imageFace, url);
      if (opened) close();
    }
  };

  useEffect(() => {
    getListImageBody();
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
    <div className="h-full bg-[#F8F8F8]">
      {isLoading && <Loading title="Working on your photo. Please wait" />}
      {isError && <PopupError title="Can not upload image" />}
      <input
        type="file"
        name="upload-choosing-face-1"
        onChange={handleUploadImage}
        id="upload-choosing-face-1"
        className="hidden"
        multiple={false}
        accept="image/png, image/jpeg"
      />

      <input
        type="file"
        name="upload-choosing-face-2"
        onChange={handleUserUploadImg}
        id="upload-choosing-face-2"
        className="hidden"
        multiple={false}
        accept="image/png, image/jpeg"
      />
      {step === 2 && (
        <div className=" max-w-[1120px] pt-20 mx-auto pb-[118px] ">
          <div
            className="flex pt-1.5 bg-white gap-5"
            style={{
              boxShadow: "0px 2px 4px 0px #00000026",
              borderRadius: "10px",
            }}
          >
            <div
              className="w-[25%] flex flex-col "
              style={{ borderRight: "1px solid #F1F0F0" }}
            >
              <div className="grid grid-cols-2 gap-1">
                <div
                  className=" h-[40px] w-full cursor-pointer flex items-center justify-center"
                  style={{
                    borderBottom:
                      selectType === 2
                        ? "1px solid #FD7BA3"
                        : "1px solid #F8F8F8",
                  }}
                  onClick={() => setSelectType(2)}
                >
                  <img
                    loading="lazy"
                    src={selectType === 2 ? iconFaceActive : iconFace}
                    alt="icon-face"
                    width={"28px"}
                    height={"28px"}
                    className="mr-1"
                  />
                  <span
                    className={twMerge(
                      "text-[14px] font-medium",
                      selectType === 2 ? "text-[#8151E6]" : ""
                    )}
                  >
                    Face
                  </span>
                </div>
                <div
                  className=" h-[40px] w-full cursor-pointer flex items-center justify-center"
                  style={{
                    borderBottom:
                      selectType === 1
                        ? "1px solid #FD7BA3"
                        : "1px solid #F8F8F8",
                  }}
                  onClick={() => setSelectType(1)}
                >
                  <img
                    loading="lazy"
                    src={selectType === 1 ? iconBodyActive : iconBody}
                    alt="icon-face"
                    width={"28px"}
                    height={"28px"}
                    className="mr-1"
                  />
                  <span
                    className={twMerge(
                      "text-[14px] font-medium",
                      selectType === 1 ? "text-[#8151E6]" : ""
                    )}
                  >
                    Body
                  </span>
                </div>
              </div>

              <div>
                {selectType === 1 ? (
                  <img
                    loading="lazy"
                    src={
                      typeof imageBody === "string"
                        ? imageBody
                        : imageBody && URL.createObjectURL(imageBody)
                    }
                    alt=" image remove background"
                    width={"auto"}
                    className="mt-5 mx-auto h-[240px] w-[150px] object-cover rounded-[10px]"
                  />
                ) : (
                  <img
                    loading="lazy"
                    src={
                      typeof imageFace === "string"
                        ? imageFace
                        : imageFace && URL.createObjectURL(imageFace)
                    }
                    alt=" image remove background"
                    width={"auto"}
                    className="mt-5 mx-auto h-[240px] w-[150px] object-cover rounded-[10px]"
                  />
                )}
                <div className="flex justify-center">
                  <Button
                    className="text-[#424242] text-[14px]  w-[160px] h-[40px] font-medium   rounded-[4px] mt-[20px]  bg-white "
                    style={{
                      boxShadow: "0px 2px 8px 0px #00000026",
                    }}
                    onClick={() => {
                      if (selectType === 1) open();
                    }}
                  >
                    {selectType === 1 ? (
                      <>
                        <img
                          loading="lazy"
                          src={iconRefresh}
                          alt=" upload"
                          width={"20px"}
                          height={"20px"}
                          className="mr-1"
                        />{" "}
                        Change Image
                      </>
                    ) : (
                      <label
                        htmlFor="upload-choosing-face-2"
                        className="flex items-center"
                      >
                        <img
                          loading="lazy"
                          src={iconRefresh}
                          alt=" upload"
                          width={"20px"}
                          height={"20px"}
                          className="mr-1"
                        />{" "}
                        Change Image
                      </label>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-[55%] flex justify-center mt-[40px] mb-[140px]">
              <img
                loading="lazy"
                src={`data:image/jpeg;base64,${imageRes}`}
                alt=" image remove background"
                width={"440px"}
                height={"318px"}
              />
            </div>
            <div className="flex flex-col items-center justify-between mt-[40px]">
              <div>
                {imageRes && (
                  <Button
                    className="text-white text-[14px]  w-[140px] h-[40px] border-none rounded-[4px]  mb-4  "
                    style={{
                      background:
                        "linear-gradient(180deg, #8151E6 0%, #FD7BA3 100%)",
                    }}
                    onClick={() => handleDownload(imageRes)}
                  >
                    <img
                      loading="lazy"
                      src={iconDownload}
                      alt="icon-download"
                      width={"20px"}
                      height={"20px"}
                      className="mr-1"
                    />{" "}
                    Download
                  </Button>
                )}
                <div className="relative ml-auto" ref={featureRef}>
                  <div
                    className={twMerge(
                      "absolute top-0 -left-64 invisible transition-all duration-300 ease-in-out opacity-0",
                      isShowFeature && "visible opacity-100"
                    )}
                  >
                    <ListFeature />
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
        </div>
      )}
      {step === 1 && (
        <div className="flex ">
          <div
            className="flex flex-col min-w-[64px] text-center bg-white"
            style={{ borderRight: "1px solid #F1F0F0" }}
          >
            <div className="mt-[10px] cursor-pointer">
              <img
                loading="lazy"
                src={photoIcon}
                alt="auto-icon"
                width={"18px"}
                height={"18px"}
                className="mx-auto "
              />
              <div
                className="font-medium text-[14px] "
                style={{
                  color: "#FD7BA3",
                }}
              >
                Photos
              </div>
            </div>
          </div>

          <div className="flex flex-col min-w-[300px] w-[300px] bg-white ">
            <div
              className="h-[40px]  text-[14px] text-[#424242] font-medium pl-3 pt-2"
              style={{
                borderBottom: "1px solid #F1F0F0",
              }}
            >
              Photos
            </div>
            <div className="p-3 ">
              <div className="flex justify-between mb-2">
                <div className="text-[14px] text-[#424242] font-medium">
                  For You
                </div>
                <div
                  className="text-[12px] text-[#8B51EA] font-normal flex  items-center cursor-pointer"
                  onClick={open}
                >
                  All
                  <img
                    loading="lazy"
                    src={iconArrowRightBlue}
                    alt="icon-arrow-right-blue"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 overflow-auto max-h-[calc(100svh-160px)] thin-scroll">
                <div
                  className="py-4 px-4 flex cursor-pointer flex-col rounded h-[138px] object-contain"
                  style={{
                    border: "1px dashed #ACACAC",
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <img
                    loading="lazy"
                    src={iconCameraPlus}
                    alt="icon-camera-plus"
                    width={"44px"}
                    height={"40px"}
                    className="mx-auto mb-3 "
                  />
                  <label
                    htmlFor="upload-choosing-face-1"
                    className="text-sm cursor-pointer font-normal text-[#ACACAC] text-center"
                  >
                    Drag and drop photo here or select.
                  </label>
                </div>
                {listImages?.map(
                  (
                    item: { name: string; list: any[] },
                    index: Key | null | undefined
                  ) => (
                    <img
                      loading="lazy"
                      src={`${API_URL}/${item.list[0]}`}
                      key={index}
                      className="cursor-pointer"
                      style={{ height: "200px" }}
                      onClick={() => setImageBody(`${API_URL}/${item.list[0]}`)}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#F8F8F8] pt-10 flex-col flex-1">
            <div className="mx-auto ">
              <img
                loading="lazy"
                src={
                  typeof imageBody === "string"
                    ? imageBody
                    : imageBody && URL.createObjectURL(imageBody)
                }
                alt=" image face change"
                className="max-w-[1040px] h-[500px] rounded-md object-contain mx-auto"
              />
              <div className="flex justify-center h-12 mx-auto mt-10">
                <Button
                  className="text-[#424242] text-sm  w-[240px] h-[48px] font-medium rounded-lg bg-white "
                  style={{
                    boxShadow: "0px 2px 8px 0px #00000026",
                  }}
                >
                  <label
                    htmlFor="upload-choosing-face-2"
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <img
                      loading="lazy"
                      src={galleryIcon}
                      alt=" upload"
                      width={"24px"}
                      height={"24px"}
                      className="mr-1"
                    />{" "}
                    Choose image to swap face
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        scrollAreaComponent={ScrollArea.Autosize}
        size={"70%"}
      >
        <div className="flex flex-col">
          <div
            style={{ border: " 1px dashed #000000" }}
            className="py-6 rounded-[8px] flex justify-center"
          >
            <Button
              className="text-black text-[20px]  w-[300px] h-[56px]  bg-white rounded-[40px] "
              style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
            >
              <img
                loading="lazy"
                src={IconUploadBlack}
                alt=" upload"
                width={"28px"}
                height={"28px"}
                className="mr-1 cursor-pointer"
              />{" "}
              Upload image
            </Button>
          </div>
          <div className="mt-8 mb-3 text-[16px] text-[#4B4B4B] font-medium">
            {" "}
            For You
          </div>
          <div className="flex flex-wrap gap-4">
            {listImages?.map(
              (
                item: { name: string; list: any[] },
                index: Key | null | undefined
              ) => (
                <img
                  loading="lazy"
                  src={`${API_URL}/${item.list[0]}`}
                  key={index}
                  className="w-[150px] h-[150px] object-cover"
                  onClick={() => handleChangeImage(item.list[0])}
                />
              )
            )}
          </div>
          {listImages?.map(
            (item: { list: string[]; name: string }, index: any) => (
              <div className="flex flex-col" key={index}>
                <div className="mt-4 mb-3 text-[16px] text-[#4B4B4B] font-medium">
                  {item?.name}
                </div>
                <div className="flex flex-wrap gap-4">
                  {item?.list?.map(
                    (item1: string, index1: Key | null | undefined) => (
                      <img
                        loading="lazy"
                        src={`${API_URL}/${item1}`}
                        key={index1}
                        onClick={() => handleChangeImage(item1)}
                        className="w-[150px] h-[150px] object-cover"
                      />
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EditFaceChange;
