import manualIcon from "../assets/icon/manual.svg";
import manualActiveIcon from "../assets/icon/manual-active.svg";
import autoIcon from "../assets/icon/auto.svg";
import autoActiveIcon from "../assets/icon/auto-active.svg";
import IconTurnLeft from "../assets/icon-turn-left.svg";
import IconTurnLeftActive from "../assets/icon-turn-left-active.svg";
import IconTurnRight from "../assets/icon-turn-right.svg";
import IconTurnRightActive from "../assets/icon-turn-right-active.svg";
import ArrowRight from "../assets/arrow-right-outline.png";
import AddOutline from "../assets/ion_add-outline.png";
import backIcon from "../assets/icon/back-icon.svg";
import checkIcon from "../assets/icon/check-icon.svg";
import iconMinus from "../assets/icon/icon-minus.svg";
import iconPlus from "../assets/icon/icon-plus.svg";
import paintBrush from "../assets/icon/paint-brush.svg";
import eraser from "../assets/icon/eraser.svg";
import paintBrushActive from "../assets/icon/paint-brush-active.svg";
import eraserActive from "../assets/icon/erase-active.svg";
import magicWand from "../assets/icon/magic-wand.svg";
import { Button, Checkbox, Slider } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useImageContext } from "../contexts/imageContext";
import Loading from "../components/Loading";
import axiosClient from "../api/AxiosClient";
import PopupError from "../components/PopupError";
import { useNavigate } from "react-router-dom";
import mergeImages from "merge-images";
import { twMerge } from "tailwind-merge";
import ListFeature from "../components/ListFeature";
import { useClickOutside } from "@mantine/hooks";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const EditRemoveObject = () => {
  const navigate = useNavigate();

  const imageContext = useImageContext();
  const [isShowFeature, setIsShowFeature] = useState<boolean>(false);
  const featureRef = useClickOutside(() => setIsShowFeature(false));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [value, setValue] = useState(0);
  const [imageRes, setImageRes] = useState<string>("");
  const [penSize, setPenSize] = useState<number>(0);
  const [selectPerson, setSelectPerson] = useState(1);
  const [selectActive, setSelectActive] = useState(0);
  const [manualType, setManualType] = useState(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [listObjImage, setlistObjImage] = useState<string[]>([]);
  const [listPerson, setlistPerson] = useState<number[]>([]);
  const [listObj, setlistObj] = useState<number[]>([]);
  // check move
  const [checkMove, setCheckMove] = useState<boolean>(false);

  const [startImage, setStartImage] = useState(imageContext.image);

  // lưu hành động
  const [backup, setBackup] = useState<File[]>([imageContext.image as File]);
  const [backupcurrent, setBackupcurrent] = useState<number>(0);
  // lưu res
  const [masks, setMasks] = useState<any>(null);
  const [boxes, setBoxes] = useState<any>(null);
  const [checkboxs, setCheckboxs] = useState<any>([]);
  // hover
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (isHovered: boolean) => {
    setIsHovered(isHovered);
  };
  const detectObj = async (image?: File) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("stype", "detect_obj");

      if (image) formData.append("file", image as File);
      else if (startImage) formData.append("file", startImage as File);

      const res = await axiosClient.post("detect_obj", formData);
      let persons: number[] = [];
      let objs: number[] = [];

      res?.data?.result?.labels.forEach((item: string, index: number) => {
        if (item === "person") {
          persons.push(index);
        } else {
          objs.push(index);
        }
      });
      setlistPerson(persons);
      setlistObj(objs);

      setBoxes(res?.data?.result?.boxes);
      setMasks(res?.data?.result?.masks);
      if (res.data.status === 200) {
        const image1 = new Image();
        image1.src = startImage ? URL.createObjectURL(startImage as File) : "";

        image1.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          canvas.width = image1.width;
          canvas.height = image1.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image1, 0, 0);
          ctx.strokeStyle = "rgba(220, 79, 255, 1)";
          ctx.lineWidth = 1;
          const croppedImages: string[] = [];
          res?.data?.result?.boxes.forEach((rect: number[]) => {
            const croppedCanvas = document.createElement("canvas");
            const croppedCtx = croppedCanvas.getContext("2d");
            const width = rect[2] - rect[0];
            const height = rect[3] - rect[1];

            croppedCanvas.width = width;
            croppedCanvas.height = height;
            if (croppedCtx) {
              croppedCtx.drawImage(
                image1,
                rect[0],
                rect[1],
                width,
                height,
                0,
                0,
                width,
                height
              );
              const croppedImageUrl = croppedCanvas.toDataURL();
              croppedImages.push(croppedImageUrl);
            }
            ctx.strokeRect(rect[0], rect[1], width, height);
          });

          const imageUrl = canvas.toDataURL();
          setImageRes(imageUrl);
          setlistObjImage(croppedImages);
        };
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
    if (startImage) {
      detectObj();
      const image = new Image();
      image.src = URL.createObjectURL(startImage as File);
      image.onload = () => {
        const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
        if (canvas) {
          canvas.width = image.width;
          canvas.height = image.height;
        }
      };
    } else if (!startImage) {
      navigate("/");
    }
  }, [startImage]);
  useEffect(() => {
    let timeOut = null;
    if (isError) {
      timeOut = setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
    return () => clearTimeout(timeOut as any);
  }, [isError]);

  const removeObject = useCallback(
    (objId?: number) => {
      const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d")!;

      if (!ctx) return;
      if (objId || objId === 0) {
        const maskOfObject1 = masks[objId][0];
        if (maskOfObject1) {
          for (let y = 0; y < maskOfObject1.length; y++) {
            for (let x = 0; x < maskOfObject1[y].length; x++) {
              if (maskOfObject1[y][x] === 1) {
                ctx.fillStyle = "rgba(255, 70, 192, 0.6)";
                ctx.fillRect(boxes[objId][0] + x, boxes[objId][1] + y, 1, 1);
              }
            }
          }
        }
      }
    },
    [masks, boxes]
  );
  const undoDraw = useCallback(
    (objId?: number) => {
      const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d")!;
      if (!ctx) return;

      if (objId || objId === 0) {
        const maskOfObject1 = masks[objId][0];
        if (maskOfObject1) {
          for (let y = 0; y < maskOfObject1.length; y++) {
            for (let x = 0; x < maskOfObject1[y].length; x++) {
              if (maskOfObject1[y][x] === 1) {
                ctx.clearRect(boxes[objId][0] + x, boxes[objId][1] + y, 1, 1);
              }
            }
          }
        }
      }
    },
    [masks, boxes]
  );
  const handelSelect = (item: number, checked: boolean) => {
    if (checked) {
      setCheckboxs((prevCheckboxs: number[]) => [...prevCheckboxs, item]);

      removeObject(item);
    } else {
      setCheckboxs((prevCheckboxs: number[]) =>
        prevCheckboxs.filter((x) => x !== item)
      );
      undoDraw(item);
    }
  };
  const handelBackAndNext = (checked: boolean) => {
    if (!checked) {
      if (backupcurrent > 0) {
        setStartImage(backup[backupcurrent - 1]);
        setBackupcurrent(backupcurrent - 1);
      }
    } else {
      if (backupcurrent < backup.length) {
        setStartImage(backup[backupcurrent + 1]);
        setBackupcurrent(backupcurrent + 1);
      }
    }
  };

  async function mergeImagesAndCanvas(
    backgroundImageURL: string,
    canvas: HTMLCanvasElement
  ) {
    return new Promise((resolve, reject) => {
      const backgroundImage = new Image();
      backgroundImage.onload = function () {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const mergedCanvas = document.createElement("canvas");
        const context = mergedCanvas.getContext("2d");

        mergedCanvas.width = canvasWidth;
        mergedCanvas.height = canvasHeight;
        if (!context) {
          reject("Canvas context is not supported");
          return;
        }
        context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
        context.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);
        // const imageUrl = mergedCanvas.toDataURL();
        // console.log(imageUrl);

        mergedCanvas.toBlob((blob) => {
          if (!blob) {
            reject("Failed to create blob from canvas");
            return;
          }
          const file = new File([blob], "merged_image.png", {
            type: "image/png",
          });
          resolve(file);
        }, "image/png");
      };
      backgroundImage.src = backgroundImageURL;
    });
  }
  const mergeTwoImages = async (image1Url: string, image2Url: string) => {
    const mergedImageUrl = await mergeImages([image1Url, image2Url]);
    const mergedImageBlob = await fetch(mergedImageUrl).then((res) =>
      res.blob()
    );
    const mergedImageFile = new File([mergedImageBlob], "merged_2_image.png", {
      type: "image/png",
    });
    setStartImage(mergedImageFile);
    // clear checkbox
    setCheckboxs([]);
    // save backup
    let cr = backupcurrent + 1;
    let bu = backup;
    if (backupcurrent + 1 > backup.length) {
      bu.push(mergedImageFile);
    } else {
      bu.splice(backupcurrent + 1, backup.length - backupcurrent);
      bu.push(mergedImageFile);
    }

    setBackupcurrent(cr);
    setBackup(bu);

    console.log(cr);
    console.log(bu);

    setImageRes(mergedImageUrl);
  };

  const removeOBJRem = async () => {
    const formData = new FormData();
    const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
    const backgroundImageURL = startImage
      ? URL.createObjectURL(startImage as File)
      : "";
    const mergedImageBase64 = await mergeImagesAndCanvas(
      backgroundImageURL,
      canvas
    );

    formData.append("stype", "objrem");

    if (startImage) formData.append("file1", mergedImageBase64 as File);
    if (startImage) formData.append("file2", startImage as File);

    const res = await axiosClient.post("objrem", formData);

    if (res.data && res.data.result) {
      const mergedImage = `data:image/jpeg;base64,${res.data.result}`;

      const mergedImageBlob = await fetch(mergedImage).then((res) =>
        res.blob()
      );
      const mergedImageFile = new File(
        [mergedImageBlob],
        "merged_2_image.png",
        {
          type: "image/png",
        }
      );
      mergeTwoImages(
        URL.createObjectURL(startImage as File),
        URL.createObjectURL(mergedImageFile as File)
      );

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // tự vẽ
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (manualType !== 0) {
      const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      if (context) {
        const { offsetX, offsetY } = event.nativeEvent;
        context.strokeStyle = "rgba(255, 0, 0, 0.6)";
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setCtx(context);
        setIsDrawing(true);
      }
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    const { offsetX, offsetY } = event.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const finishDrawing = () => {
    ctx?.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
  };

  // thay đổi kích cỡ pen
  useEffect(() => {
    const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (context) {
      setCtx(context);
      context.lineWidth = penSize;
    }
  }, [penSize]);
  const handleSliderChange = (value: number) => {
    setPenSize(value);
  };

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
                    key={item}
                    className="flex flex-row justify-between mb-3"
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src={listObjImage[item]}
                        alt="person image"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div className="text-[14px] text-[#424242] font-medium ml-2">
                        {"Person" + index}
                      </div>
                    </div>
                    <Checkbox
                      className="my-auto"
                      value={item}
                      checked={checkboxs.includes(item)}
                      onChange={(e) =>
                        handelSelect(parseInt(e.target.value), e.target.checked)
                      }
                    ></Checkbox>
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
                {listObj?.map((item, index) => (
                  <div
                    key={item}
                    className="flex flex-row justify-between mb-3"
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src={listObjImage[item]}
                        alt="person image"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div className="text-[14px] text-[#424242] font-medium ml-2">
                        {"Object" + index}
                      </div>
                    </div>
                    <Checkbox
                      className="my-auto"
                      value={item}
                      checked={checkboxs.includes(item)}
                      onChange={(e) =>
                        handelSelect(parseInt(e.target.value), e.target.checked)
                      }
                    ></Checkbox>
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
                    setCheckMove(false);
                  } else {
                    setManualType(1);
                    setToDraw();
                    setCheckMove(true);
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
                    setCheckMove(false);
                  } else {
                    setManualType(2);
                    setToErase();
                    setCheckMove(true);
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
                value={penSize}
                onChange={handleSliderChange}
                className="w-[276px] h-[24px] mt-1 "
              />
              <div
                className="ml-auto mt-4 w-[60px] h-[30px] bg-white text-black text-[14px] font-normal flex justify-center items-center rounded"
                style={{ border: "1px solid #DBDADA" }}
              >
                {penSize}%
              </div>
            </div>
          </div>
        )
      )}
      <TransformWrapper initialScale={1} disabled={checkMove}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="bg-[#F8F8F8] flex w-full h-fit flex-col">
            {isLoading && (
              <Loading title="Working on your photo. Please wait" />
            )}
            {isError && <PopupError title="Can not upload image" />}
            <div className="w-3/5 mx-auto">
              <div className="flex flex-row">
                <TransformComponent>
                  <canvas
                    id="mycanvas"
                    style={{
                      backgroundImage: `URL(${
                        imageRes
                          ? imageRes
                          : startImage
                          ? URL.createObjectURL(startImage as File)
                          : ""
                      })`,
                      backgroundSize: "100%",
                      backgroundRepeat: "no-repeat",
                      display: isHovered ? "none" : "block",
                    }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={finishDrawing}
                    onMouseOut={finishDrawing}
                    className="mt-10  bg-cover bg-no-repeat"
                  ></canvas>
                </TransformComponent>

                <img
                  src={URL.createObjectURL(imageContext.image as File)}
                  alt="remove_object_ex"
                  style={{
                    display: isHovered ? "block" : "none",
                  }}
                  className="w-[auto] h-[auto] mt-10"
                  width={"100%"}
                  height={"100%"}
                />
                <div className=" flex flex-col ">
                  <div>
                    <img
                      onMouseDown={() => handleHover(true)}
                      onMouseUp={() => handleHover(false)}
                      src={checkIcon}
                      alt="check-icon"
                      width={"40px"}
                      className="h-[40px] mt-7 ml-28"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <img
                      src={iconMinus}
                      alt="icon-minus"
                      onClick={() => zoomOut()}
                      width={"40px"}
                      height={"40px"}
                      className=" mt-2 ml-28"
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div>
                    <img
                      src={iconPlus}
                      alt="icon-plus"
                      onClick={() => zoomIn()}
                      className="h-[40px] mt-2 ml-28"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
              {selectActive !== 0 ? (
                <div className="flex justify-center pt-[146px] pb-[46px]">
                  <Button
                    className="text-white text-[20px] leading-[23.44px] w-[260px] h-[48px]   rounded-[40px]   "
                    style={{
                      background:
                        "linear-gradient(180deg, #8151E6 0%, #FD7BA3 100%)",
                    }}
                    onClick={() => {
                      removeOBJRem();
                      handleSliderChange(0);
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
                <div className="pb-[240px]"></div>
              )}
            </div>
            <div className=" mb-[118px] flex-row flex justify-between ml-8 mr-[80px]">
              <div className="flex flex-row gap-2">
                <div className="flex-col flex ">
                  <img
                    src={
                      backupcurrent === 0 ? IconTurnLeft : IconTurnLeftActive
                    }
                    alt="icon-turn-left"
                    onClick={() => handelBackAndNext(false)}
                    style={{
                      cursor: backupcurrent === 0 ? "not-allowed" : "pointer",
                    }}
                  />
                  <div className="text-[14px] text-[#A1A1A1] font-bold mx-auto mt-0.5">
                    {backupcurrent}
                  </div>
                </div>

                <div className="flex-col flex ">
                  <img
                    src={
                      backup.length - backupcurrent - 1 === 0
                        ? IconTurnRight
                        : IconTurnRightActive
                    }
                    alt="icon-turn-right"
                    onClick={() => handelBackAndNext(true)}
                    style={{
                      cursor:
                        backup.length - backupcurrent - 1 === 0
                          ? "not-allowed"
                          : "pointer",
                    }}
                  />
                  <div className="text-[14px] text-[#A1A1A1] font-bold mx-auto mt-0.5">
                    {backup.length - backupcurrent - 1}
                  </div>
                </div>
                <div>
                  <img
                    src={backIcon}
                    alt="back-icon"
                    width={"40px"}
                    height={"40px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setStartImage(imageContext.image);
                      setBackup([imageContext.image as File]);
                      setBackupcurrent(0);
                      setSelectActive(0);
                      resetTransform();
                      setManualType(0);
                      const canvas = document.getElementById(
                        "mycanvas"
                      ) as HTMLCanvasElement;
                      const context = canvas.getContext("2d");
                      if (context) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="relative ml-auto" ref={featureRef}>
                  <div
                    className={twMerge(
                      "absolute bottom-0 -left-64 invisible transition-all duration-300 ease-in-out opacity-0",
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
                <div
                  className="flex flex-row w-[120px] h-10 px-2 py-2.5 items-center rounded-[4px]"
                  style={{ boxShadow: "0px 2px 8px 0px #00000026" }}
                >
                  <img
                    src={AddOutline}
                    alt="arrow-right-outline"
                    className="mr-1"
                  />
                  <p className="text-black text-[14px] font-medium">
                    New Image
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

export default EditRemoveObject;
