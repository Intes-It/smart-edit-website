import photoIcon from "../assets/icon/icon-photo-active.svg";
import galleryIcon from "../assets/icon/icon-gallery-wide.svg";
import iconArrowRightBlue from "../assets/icon/icon-arrow-right-blue.svg";
import iconCameraPlus from "../assets/icon/icon-camera-plus.svg";
import remove_object_ex from "../assets/remove_object_ex.png";
import { Button, Modal, ScrollArea } from "@mantine/core";
import { Key, useEffect, useState } from "react";
import IconUploadBlack from "../assets/icon_upload_black.svg";
import exChangeFace from "../assets/ex-change-face.png";
import axiosClient from "../api/AxiosClient";
import { useDisclosure } from "@mantine/hooks";
import iconDownload from "../assets/icon/icon-download.svg";
import iconFace from "../assets/icon/icon-face.svg";
import iconFaceActive from "../assets/icon/icon-face-active.svg";
import iconBody from "../assets/icon/icon-body.svg";
import iconBodyActive from "../assets/icon/icon-body-active.svg";
import iconRefresh from "../assets/icon/icon-refresh.svg";

import ArrowRight from "../assets/arrow-right-outline.png";
const EditFaceChange = () => {
  const [listImages, setListImages] = useState<any>(null);
  const [selectType, setSelectType] = useState(1);
  const [file, setFile] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const getListImageBody = async () => {
    try {
      const res = await axiosClient.get("list_image_body");
      if (res.status === 200) {
        setListImages(res.data?.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListImageBody();
  }, []);

  return file !== null ? (
    <div className="bg-white px-[200px] pt-10 pb-[118px] ">
      <div
        className="mt-8 flex flex-row"
        style={{
          boxShadow: "0px 2px 4px 0px #00000026",
          borderRadius: "10px",
        }}
      >
        <div
          className="w-[25%] flex flex-col "
          style={{ borderRight: "1px solid #F1F0F0" }}
        >
          <div className="flex flex-row ">
            {selectType === 1 ? (
              <div
                className="w-1/2 h-[40px] flex-row flex items-center justify-center"
                style={{
                  borderBottom: "1px solid #FD7BA3",
                }}
              >
                <img
                  src={iconFaceActive}
                  alt="icon-face"
                  width={"28px"}
                  height={"28px"}
                  className="mr-1"
                />
                <span className="text-[14px] text-[#8151E6] font-medium">
                  Face
                </span>
              </div>
            ) : (
              <div
                className="w-1/2  h-[40px] flex-row flex items-center justify-center"
                style={{
                  borderBottom: "1px solid",
                }}
                onClick={() => {
                  setSelectType(1);
                }}
              >
                <img
                  src={iconFace}
                  alt="icon-face"
                  width={"28px"}
                  height={"28px"}
                  className="mr-1"
                />
                <span className="text-[14px] text-[#424242] font-medium">
                  Face
                </span>
              </div>
            )}
            {selectType === 2 ? (
              <div
                className="w-1/2 h-[40px] flex-row flex items-center justify-center"
                style={{
                  borderBottom: "1px solid #FD7BA3",
                }}
              >
                <img
                  src={iconBodyActive}
                  alt="icon-face"
                  width={"28px"}
                  height={"28px"}
                  className="mr-1"
                />
                <span className="text-[14px] text-[#8151E6] font-medium">
                  Body
                </span>
              </div>
            ) : (
              <div
                className="w-1/2  h-[40px] flex-row flex items-center justify-center"
                style={{
                  borderBottom: "1px solid",
                }}
                onClick={() => {
                  setSelectType(2);
                }}
              >
                <img
                  src={iconBody}
                  alt="icon-face"
                  width={"28px"}
                  height={"28px"}
                  className="mr-1"
                />
                <span className="text-[14px] text-[#424242] font-medium">
                  Body
                </span>
              </div>
            )}
          </div>
          {selectType === 1 ? (
            <div>
              <img
                src={exChangeFace}
                alt=" image remove background"
                width={"auto"}
                className="mt-5 mx-auto h-[240px]"
              />
              <div className="flex justify-center">
                <Button
                  className="text-[#424242] text-[14px]  w-[160px] h-[40px] font-medium   rounded-[4px] mt-[20px]  bg-white "
                  style={{
                    boxShadow: "0px 2px 8px 0px #00000026",
                  }}
                >
                  <img
                    src={iconRefresh}
                    alt=" upload"
                    width={"20px"}
                    height={"20px"}
                    className="mr-1"
                  />{" "}
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <img
                src={exChangeFace}
                alt=" image remove background"
                width={"auto"}
                className="mt-5 mx-auto h-[240px]"
              />
              <div className="flex justify-center">
                <Button
                  className="text-[#424242] text-[14px]  w-[160px] h-[40px] font-medium   rounded-[4px] mt-[20px]  bg-white "
                  style={{
                    boxShadow: "0px 2px 8px 0px #00000026",
                  }}
                >
                  <img
                    src={iconRefresh}
                    alt=" upload"
                    width={"20px"}
                    height={"20px"}
                    className="mr-1"
                  />{" "}
                  Change Image
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="w-[55%] flex justify-center mt-[40px] mb-[140px]">
          <img
            src={exChangeFace}
            alt=" image remove background"
            width={"440px"}
            height={"318px"}
          />
        </div>
        <div
          style={{ borderLeft: "1px solid #F1F0F0" }}
          className="w-1/5 flex flex-col items-center justify-between mt-[40px]"
        >
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
  ) : (
    <div className="flex flex-row">
      <div
        className="flex flex-col w-[64px] bg-white "
        style={{ borderRight: "1px solid #F1F0F0" }}
      >
        <div className="mx-auto mt-[10px] cursor-pointer">
          <img
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

      <div className="w-1/5 bg-white flex flex-col  ">
        <div
          className="h-[40px]  text-[14px] text-[#424242] font-medium pl-3 pt-2"
          style={{
            borderBottom: "1px solid #F1F0F0",
          }}
        >
          Photos
        </div>
        <div className="p-3">
          <div className="flex flex-row justify-between mb-2">
            <div className="text-[14px] text-[#424242] font-medium">
              For You
            </div>
            <div
              className="text-[12px] text-[#8B51EA] font-normal flex flex-row items-center cursor-pointer"
              onClick={open}
            >
              All
              <img src={iconArrowRightBlue} alt="icon-arrow-right-blue" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="py-4 px-6 flex flex-col rounded h-[168px]"
              style={{
                border: "1px dashed #ACACAC",
              }}
            >
              <img
                src={iconCameraPlus}
                alt="icon-camera-plus"
                width={"44px"}
                height={"40px"}
                className="mb-3 mx-auto"
              />
              <div className="text-[14px] font-normal text-[#ACACAC] text-center">
                Drag and drop photo here or select.
              </div>
            </div>
            {listImages?.map(
              (
                item: { name: string; list: any[] },
                index: Key | null | undefined
              ) => (
                <img
                  src={`http://103.176.149.253:8088/${item.list[0]}`}
                  key={index}
                  style={{ height: "200px" }}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#F8F8F8] flex w-full flex-col">
        <div className="w-2/5 mx-auto">
          <img
            src={remove_object_ex}
            alt="remove_object_ex"
            width={"100%"}
            height={"100%"}
            className="mt-10 "
          />
          <div className="flex justify-center">
            <Button
              className="text-[#424242] text-[14px]  w-[240px] h-[48px] font-medium   rounded-[8px] mt-[32px] mb-[196px] bg-white "
              style={{
                boxShadow: "0px 2px 8px 0px #00000026",
              }}
            >
              <img
                src={galleryIcon}
                alt=" upload"
                width={"24px"}
                height={"24px"}
                className="mr-1"
              />{" "}
              Choose ima ge to swap face
            </Button>
          </div>
        </div>
      </div>
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
                src={IconUploadBlack}
                alt=" upload"
                width={"28px"}
                height={"28px"}
                className="mr-1"
              />{" "}
              Upload image
            </Button>
          </div>
          <div className="mt-8 mb-3 text-[16px] text-[#4B4B4B] font-medium">
            {" "}
            For You
          </div>
          <div className="flex flex-row gap-4">
            {listImages?.map(
              (
                item: { name: string; list: any[] },
                index: Key | null | undefined
              ) => (
                <img
                  src={`http://103.176.149.253:8088/${item.list[0]}`}
                  key={index}
                  style={{ height: "200px" }}
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
                <div className="flex flex-row gap-4">
                  {item?.list?.map(
                    (item1: string, index1: Key | null | undefined) => (
                      <img
                        src={`http://103.176.149.253:8088/${item1}`}
                        key={index1}
                        style={{ height: "200px" }}
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
