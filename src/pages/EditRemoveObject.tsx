import manualIcon from "../assets/icon/manual.svg";
import manualActiveIcon from "../assets/icon/manual-active.svg";
import autoIcon from "../assets/icon/auto.svg";
import autoActiveIcon from "../assets/icon/auto-active.svg";
import remove_object_ex from "../assets/remove_object_ex.png";
import IconTurnLeft from "../assets/icon-turn-left.svg";
import IconTurnRight from "../assets/icon-turn-right.svg";
import ArrowRight from "../assets/arrow-right-outline.png";
import AddOutline from "../assets/ion_add-outline.png";
import backIcon from "../assets/icon/back-icon.svg";
import checkIcon from "../assets/icon/check-icon.svg";
import iconMinus from "../assets/icon/icon-minus.svg";
import iconPlus from "../assets/icon/icon-plus.svg";
import person1 from "../assets/picture-person1.png";
import object1 from "../assets/picture-object1.png";
import paintBrush from "../assets/icon/paint-brush.svg";
import eraser from "../assets/icon/eraser.svg";
import paintBrushActive from "../assets/icon/paint-brush-active.svg";
import eraserActive from "../assets/icon/erase-active.svg";
import magicWand from "../assets/icon/magic-wand.svg";
import { Button, Checkbox, Slider } from "@mantine/core";
import { useState } from "react";
const EditRemoveObject = () => {
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [selectPerson, setSelectPerson] = useState(1);
  const [selectActive, setSelectActive] = useState(0);
  const [manualType, setManualType] = useState(0);
  const listPerson = [
    {
      image: person1,
      label: "Person 1",
    },
    {
      image: person1,
      label: "Person 2",
    },
    {
      image: person1,
      label: "Person 3",
    },
  ];
  const listObject = [
    {
      image: object1,
      label: "Person 1",
    },
    {
      image: object1,
      label: "Person 2",
    },
    {
      image: object1,
      label: "Person 3",
    },
  ];

  return (
    <div className="flex flex-row">
      <div
        className="flex flex-col w-[64px] bg-white "
        style={{ borderRight: "1px solid #F1F0F0" }}
      >
        <div
          className="mx-auto mt-[10px] cursor-pointer"
          onClick={() => {
            if (selectActive === 1) {
              setSelectActive(0);
            } else {
              setSelectActive(1);
            }
          }}
        >
          <img
            src={selectActive === 1 ? autoActiveIcon : autoIcon}
            alt="auto-icon"
            width={"24px"}
            height={"24px"}
            className="mx-auto "
          />
          <div
            className="font-medium text-[14px] "
            style={{
              color: selectActive === 1 ? "#FD7BA3" : "#424242",
            }}
          >
            Auto
          </div>
        </div>
        <div
          className="mx-auto mt-[10px] cursor-pointer"
          onClick={() => {
            if (selectActive === 2) {
              setSelectActive(0);
            } else {
              setSelectActive(2);
            }
          }}
        >
          <img
            src={selectActive === 2 ? manualActiveIcon : manualIcon}
            alt="auto-icon"
            width={"24px"}
            height={"21px"}
            className="mx-auto"
          />
          <div
            className="font-medium text-[14px] text-[#424242] rounded"
            style={{
              color: selectActive === 2 ? "#FD7BA3" : "#424242",
            }}
          >
            Manual
          </div>
        </div>
      </div>
      {selectActive === 1 ? (
        <div className="w-[300px] bg-white flex flex-col px-3 py-4">
          <div className="bg-[#EEEEEE] flex flex-row p-1 rounded">
            <div
              onClick={() => {
                setSelectPerson(1);
              }}
              className=" h-8 w-[134px] flex justify-center items-center rounded text-[14px] font-medium cursor-pointer "
              style={{
                boxShadow:
                  selectPerson === 1 ? "0px 2px 4px 0px #00000026" : "none",
                background: selectPerson === 1 ? "white" : "#EEEEEE",
              }}
            >
              {" "}
              People
            </div>
            <div
              onClick={() => {
                setSelectPerson(2);
              }}
              className=" h-8 w-[134px] flex justify-center items-center rounded text-[14px] font-medium cursor-pointer"
              style={{
                boxShadow:
                  selectPerson === 2 ? "0px 2px 4px 0px #00000026" : "none",
                background: selectPerson === 2 ? "white" : "#EEEEEE",
              }}
            >
              {" "}
              Other
            </div>
          </div>
          {selectPerson === 1 ? (
            <div className="flex flex-col">
              <div className="text-[12px] text-[#424242] font-medium flex flex-row gap-2 ml-auto mt-6">
                Select all <Checkbox></Checkbox>
              </div>
              <div className="mt-2 flex flex-col">
                {listPerson?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between mb-3"
                  >
                    <div className="flex flex-row items-center">
                      <img src={item.image} alt="person image" />
                      <div className="text-[14px] text-[#424242] font-medium ml-2">
                        {item.label}
                      </div>
                    </div>
                    <Checkbox className="my-auto"></Checkbox>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="text-[12px] text-[#424242] font-medium flex flex-row gap-2 ml-auto mt-6">
                Select all <Checkbox></Checkbox>
              </div>
              <div className="mt-2 flex flex-col">
                {listObject?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between mb-3"
                  >
                    <div className="flex flex-row items-center">
                      <img src={item.image} alt="person image" />
                      <div className="text-[14px] text-[#424242] font-medium ml-2">
                        {item.label}
                      </div>
                    </div>
                    <Checkbox className="my-auto"></Checkbox>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        selectActive === 2 && (
          <div className="w-[300px] bg-white flex flex-col  ">
            <div
              className="h-[40px]  text-[14px] text-[#424242] font-medium pl-3 pt-2"
              style={{
                borderBottom: "1px solid #F1F0F0",
              }}
            >
              Manual
            </div>
            <div className="flex flex-row justify-between px-3 pt-4">
              <div
                style={{
                  borderRadius: "2px",
                  padding: "6px",
                  cursor: "pointer",
                  border: "1px solid #9D9D9D ",
                }}
                onClick={() => {
                  if (manualType === 1) {
                    setManualType(0);
                  } else {
                    setManualType(1);
                  }
                }}
              >
                <img
                  src={manualType === 1 ? paintBrushActive : paintBrush}
                  alt="paint-brush"
                  width={"24px"}
                  height={"24px"}
                />
              </div>
              <div
                style={{
                  borderRadius: "2px",
                  padding: "6px",
                  cursor: "pointer",
                  border: "1px solid #9D9D9D ",
                }}
                onClick={() => {
                  if (manualType === 2) {
                    setManualType(0);
                  } else {
                    setManualType(2);
                  }
                }}
              >
                <img
                  src={manualType === 2 ? eraserActive : eraser}
                  alt="paint-brush"
                  width={"24px"}
                  height={"24px"}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col px-3">
              <div className="text-[12px] text-[#424242] font-medium">Size</div>
              <Slider
                value={value1}
                onChange={setValue1}
                className="w-[276px] h-[24px] mt-1 "
              />
              <div
                className="ml-auto mt-4 w-[60px] h-[30px] bg-white text-black text-[14px] font-normal flex justify-center items-center rounded"
                style={{ border: "1px solid #DBDADA" }}
              >
                {value1}%
              </div>
            </div>
          </div>
        )
      )}

      <div className="bg-[#F8F8F8] flex w-full flex-col">
        <div className="w-3/5 mx-auto">
          <img
            src={remove_object_ex}
            alt="remove_object_ex"
            width={"100%"}
            height={"100%"}
            className="mt-10 "
          />
          {selectActive !== 0 ? (
            <div className="flex justify-center">
              <Button
                className="text-white text-[20px] leading-[23.44px] w-[260px] h-[48px]   rounded-[40px] mt-[146px] mb-[46px]  "
                style={{
                  background:
                    "linear-gradient(180deg, #8151E6 0%, #FD7BA3 100%)",
                }}
              >
                <img
                  src={magicWand}
                  alt=" upload"
                  width={"24px"}
                  height={"24px"}
                  className="mr-1"
                />{" "}
                Delete
              </Button>
            </div>
          ) : (
            <div className="mb-[240px]"></div>
          )}
        </div>
        <div className=" mb-[118px] flex-row flex justify-between ml-8 mr-[80px]">
          <div className="flex flex-row gap-2">
            <div className="flex-col flex ">
              <img src={IconTurnLeft} alt="icon-turn-left" />
              <div className="text-[14px] text-[#A1A1A1] font-bold mx-auto mt-0.5">
                0
              </div>
            </div>

            <div className="flex-col flex ">
              <img src={IconTurnRight} alt="icon-turn-right" />
              <div className="text-[14px] text-[#A1A1A1] font-bold mx-auto mt-0.5">
                0
              </div>
            </div>
            <div>
              <img
                src={backIcon}
                alt="back-icon"
                width={"40px"}
                height={"40px"}
              />
            </div>
            <div>
              <img
                src={checkIcon}
                alt="check-icon"
                width={"40px"}
                className="h-[40px]"
              />
            </div>
            <div className=" ml-[60px] flex flex-row gap-2">
              <div>
                <img src={iconMinus} alt="icon-minus" />
              </div>
              <Slider
                value={value}
                onChange={setValue}
                className="w-[200px] h-[24px] mt-1"
              />
              <div>
                <img src={iconPlus} alt="icon-plus" />
              </div>
              <div
                className="ml-6 w-[60px] h-[30px] bg-white text-black text-[14px] font-normal flex justify-center items-center rounded"
                style={{ border: "1px solid #DBDADA" }}
              >
                {value}%
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

export default EditRemoveObject;
