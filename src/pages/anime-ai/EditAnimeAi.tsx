import { Button, Slider } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { twMerge } from "tailwind-merge";
import axiosClient, { API_URL } from "../../api/AxiosClient";
import ArrowRight from "../../assets/arrow-right-outline.png";
import icon from "../../assets/icon/anime-ai-icon.svg";
import ListFeature from "../../components/ListFeature";
import Loading from "../../components/Loading";
import PopupError from "../../components/PopupError";
import { useImageContext } from "../../contexts/imageContext";
import { compressImage } from "../../utils/comressImage";
import { getImageDimensions, imageUrlToFile } from "../../utils/convertImage";

type optionType = {
  id: string;
  image: string;
  image_mini: string;
  n_prompt: string;
  name: string;
  prompt: string;
  reward_ads: boolean;
  strength: number | string;
};

const EditAnimeAi = () => {
  const imageContext = useImageContext();

  const [selectedAnime, setSelectedAnime] = useState<null | optionType>(null);
  const [listOptions, setListOptions] = useState<null | optionType[]>(null);
  const [imageFile, setImageFile] = useState<null | File | Blob | string>(
    typeof imageContext.image === "string"
      ? `data:image/jpeg;base64,${imageContext.image}`
      : imageContext.image
  );
  const [imageRes, setImageRes] = useState<null | string>(null);
  const [zoomValue, setZoomValue] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isShowFeature, setIsShowFeature] = useState<boolean>(false);
  const [imageShow, setImageShow] = useState<"BEFORE" | "AFTER">("BEFORE");

  const featureRef = useClickOutside(() => setIsShowFeature(false));

  const getListOptionAnime = async () => {
    try {
      const res = await axiosClient.get("get_list_anime");

      if (res.status === 200) {
        setListOptions(res.data.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSelectImage = (item: optionType) => {
    if (item.id !== selectedAnime?.id) setSelectedAnime(item);

    if (imageFile) handleTransferImage(item);
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = await compressImage(event.target.files?.[0] as File);

    imageRes && setImageRes(null);
    imageShow === "AFTER" && setImageShow("BEFORE");

    if (uploadedFile) {
      setImageFile(uploadedFile);
    }

    if (selectedAnime) {
      handleTransferImage(selectedAnime, uploadedFile as File);
    }
  };

  const handleDragOver = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.files[0]) {
      const droppedFile = await compressImage(
        event.dataTransfer.files[0] as File
      );
      // Check for image file type
      if (droppedFile && droppedFile.type.startsWith("image/")) {
        setImageFile(droppedFile);
      }
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = await compressImage(
      event.dataTransfer.files[0] as File
    );

    // Check for image file type
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setImageFile(droppedFile);
    }
  };

  const handleTransferImage = async (selected?: optionType, image?: File) => {
    // Early return if loading
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Get image dimensions (avoid unnecessary type assertion)
      const imageSize = image
        ? await getImageDimensions(image)
        : { height: 1000, width: 1000 };

      const payload = new FormData();

      // Use optional chaining for cleaner access
      payload.append(
        "prompt",
        (selected?.prompt || selectedAnime?.prompt) as string
      );
      payload.append(
        "n_prompt",
        (selected?.n_prompt || selectedAnime?.n_prompt) as string
      );
      payload.append(
        "strength",
        selected?.strength || (selectedAnime?.strength as any)
      );

      // Conditional logic for image handling (combine conditions)
      if (typeof imageFile === "string") {
        payload.append("image", await imageUrlToFile(imageFile, "body-change"));
      } else {
        payload.append("image", (image || imageFile) as File);
      }

      payload.append("width", imageSize.width as any);
      payload.append("height", imageSize.height as any);
      payload.append("num_inference_steps", "20");
      payload.append("seed", "1");

      const res = await axiosClient.post("stable_diffusion_v2", payload);

      if (res.status === 200) {
        setImageRes(res.data?.result);
        setImageShow("AFTER");
        imageContext.setImage(res.data?.result);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("error", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    handleTransferImage();
  };

  const getUrlImage = () => {
    let url = null as string | null | File;

    if (imageShow === "BEFORE") {
      typeof imageFile === "string"
        ? (url = imageFile)
        : (url = URL.createObjectURL(imageFile as File));
    } else if (imageRes) {
      url = `data:image/jpeg;base64,${imageRes}`;
    } else {
      url = URL.createObjectURL(imageFile as File);
    }

    return url;
  };

  useEffect(() => {
    getListOptionAnime();
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
    <div className="flex h-full">
      {isLoading && <Loading title="Working on your photo. Please wait" />}
      {isError && <PopupError title="Can not upload image" />}
      <input
        type="file"
        name="upload"
        onChange={handleUploadImage}
        id="upload"
        className="hidden"
        multiple={false}
        accept="image/png, image/jpeg"
      />
      <div className="flex justify-center pt-3 w-16 border-r border-[#DBDADA] items-start">
        <img src={icon} className="w-6" alt="anime icon" />
      </div>
      <div className="pt-3 w-[300px]">
        <div className="text-sm px-3 font-medium border-b border-[#DBDADA] pb-3">
          Anime AI
        </div>
        <div className="p-3">
          <div onDragOver={handleDragOver} onDrop={handleDrop}>
            <Button className="border-dashed cursor-pointer px-0 h-[60px] w-full rounded items-center border-[#ACACAC] border bg-[#FAFAFA]">
              <label
                htmlFor="upload"
                className="h-[60px] flex items-center cursor-pointer w-full"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.4167 0.0410156C14.5824 0.0410156 14.7414 0.106864 14.8586 0.224074C14.9758 0.341284 15.0417 0.500255 15.0417 0.666016V2.95768H17.3333C17.4991 2.95768 17.6581 3.02353 17.7753 3.14074C17.8925 3.25795 17.9583 3.41692 17.9583 3.58268C17.9583 3.74844 17.8925 3.90741 17.7753 4.02462C17.6581 4.14183 17.4991 4.20768 17.3333 4.20768H15.0417V6.49935C15.0417 6.66511 14.9758 6.82408 14.8586 6.94129C14.7414 7.0585 14.5824 7.12435 14.4167 7.12435C14.2509 7.12435 14.0919 7.0585 13.9747 6.94129C13.8575 6.82408 13.7917 6.66511 13.7917 6.49935V4.20768H11.5C11.3342 4.20768 11.1753 4.14183 11.0581 4.02462C10.9408 3.90741 10.875 3.74844 10.875 3.58268C10.875 3.41692 10.9408 3.25795 11.0581 3.14074C11.1753 3.02353 11.3342 2.95768 11.5 2.95768H13.7917V0.666016C13.7917 0.500255 13.8575 0.341284 13.9747 0.224074C14.0919 0.106864 14.2509 0.0410156 14.4167 0.0410156Z"
                    fill="#ACACAC"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.00033 0.0410156H8.95283C7.02866 0.0410156 5.52116 0.0410157 4.34449 0.199349C3.14116 0.361016 2.19116 0.699349 1.44533 1.44435C0.699492 2.19018 0.361992 3.14018 0.200326 4.34435C0.0419922 5.52018 0.0419922 7.02768 0.0419922 8.95185V9.04685C0.0419922 10.971 0.0419922 12.4785 0.200326 13.6552C0.361992 14.8585 0.700326 15.8085 1.44533 16.5543C2.19116 17.3002 3.14116 17.6377 4.34533 17.7993C5.52116 17.9577 7.02866 17.9577 8.95283 17.9577H9.04783C10.972 17.9577 12.4795 17.9577 13.6562 17.7993C14.8595 17.6377 15.8095 17.2993 16.5553 16.5543C17.3012 15.8085 17.6387 14.8585 17.8003 13.6543C17.9587 12.4785 17.9587 10.971 17.9587 9.04685V8.99935C17.9587 8.83359 17.8928 8.67462 17.7756 8.55741C17.6584 8.4402 17.4994 8.37435 17.3337 8.37435C17.1679 8.37435 17.0089 8.4402 16.8917 8.55741C16.7745 8.67462 16.7087 8.83359 16.7087 8.99935C16.7087 10.981 16.707 12.4043 16.562 13.4877L16.5437 13.6143L14.232 11.5335C13.7061 11.0603 13.0352 10.7796 12.329 10.7372C11.6229 10.6948 10.9232 10.8933 10.3445 11.3002L10.0962 11.4752C9.89547 11.6159 9.65159 11.6814 9.40741 11.66C9.16323 11.6387 8.93439 11.5319 8.76116 11.3585L5.18616 7.78352C4.73013 7.32766 4.11789 7.06217 3.47344 7.04082C2.829 7.01947 2.20053 7.24385 1.71533 7.66852L1.29283 8.03768C1.29699 6.54435 1.31783 5.41018 1.43866 4.51102C1.58199 3.44518 1.85533 2.80268 2.32949 2.32768C2.80449 1.85352 3.44616 1.58102 4.51199 1.43768C5.59532 1.29268 7.01866 1.29102 9.00033 1.29102C9.16609 1.29102 9.32506 1.22517 9.44227 1.10796C9.55948 0.990747 9.62533 0.831776 9.62533 0.666016C9.62533 0.500255 9.55948 0.341284 9.44227 0.224074C9.32506 0.106864 9.16609 0.0410156 9.00033 0.0410156ZM1.43866 13.4877C1.58199 14.5535 1.85533 15.196 2.32949 15.671C2.80449 16.1452 3.44616 16.4177 4.51199 16.561C5.59532 16.706 7.01866 16.7077 9.00033 16.7077C10.982 16.7077 12.4053 16.706 13.4887 16.561C14.5545 16.4177 15.197 16.1443 15.672 15.6702C15.8805 15.4611 16.0508 15.2171 16.1753 14.9493C16.1421 14.9292 16.1109 14.9061 16.082 14.8802L13.3962 12.4635C13.0808 12.1792 12.6782 12.0103 12.2543 11.9845C11.8304 11.9588 11.4103 12.0777 11.0628 12.3218L10.8153 12.4968C10.374 12.8071 9.83733 12.9517 9.29984 12.9053C8.76235 12.8588 8.2585 12.6241 7.87699 12.2427L4.30199 8.66768C4.07021 8.43595 3.759 8.30099 3.43143 8.29016C3.10385 8.27933 2.78441 8.39343 2.53783 8.60935L1.29199 9.69935C1.29449 11.3227 1.31116 12.5368 1.43866 13.4877Z"
                    fill="#ACACAC"
                  />
                </svg>
                <p className="text-sm ml-2 font-normal text-[#ACACAC]">
                  Drag and drop photo here or select.
                </p>
              </label>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-10 gap-y-4  overflow-auto max-h-[calc(100svh-235px)] thin-scroll">
            {listOptions?.map((item) => (
              <div key={item.id}>
                <div
                  className={twMerge(
                    "cursor-pointer rounded-[10px] overflow-hidden border-2 border-transparent",
                    selectedAnime?.id === item.id && "border-linear-image"
                  )}
                  onClick={() => handleSelectImage(item)}
                >
                  <img
                    src={`${API_URL}/${item.image}`}
                    loading="lazy"
                    alt="anime style"
                    className="w-[132px] h-[168px] object-cover"
                  />
                </div>
                <div
                  className={twMerge(
                    "mt-2 text-sm font-medium text-center ",
                    selectedAnime?.id === item.id && "text-linear"
                  )}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TransformWrapper
        initialScale={1}
        maxScale={2}
        onTransformed={(e) => {
          setZoomValue(Math.round(e.instance.transformState.scale * 100 - 100));
        }}
      >
        {({ zoomIn, zoomOut, ...rest }) => (
          <div className="bg-[#F8F8F8] flex-1">
            <div className="flex flex-col h-full mt-10">
              <div className="min-h-[650px]  flex-1 mx-auto">
                <TransformComponent>
                  {(imageRes || imageFile) && (
                    <img
                      src={getUrlImage()}
                      alt="anime option selected"
                      className="object-contain h-[650px] mx-auto "
                    />
                  )}
                </TransformComponent>
              </div>
              <div className="flex flex-row justify-between pb-24 float-end pl-14">
                <div className="flex flex-row gap-2">
                  <Button
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer"
                    style={{
                      boxShadow: "0px 2px 4px 0px #00000026",
                      color: !imageRes ? "#DADADA" : "#424242",
                    }}
                    onClick={handleRetry}
                    disabled={!imageRes}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 3.99993V8.99993H4.582M4.582 8.99993C5.24585 7.35806 6.43568 5.98284 7.96503 5.08979C9.49438 4.19674 11.2768 3.83634 13.033 4.06507C14.7891 4.29379 16.4198 5.09872 17.6694 6.3537C18.919 7.60869 19.7168 9.24279 19.938 10.9999M4.582 8.99993H9M20 19.9999V14.9999H19.419M19.419 14.9999C18.7542 16.6408 17.564 18.015 16.0348 18.9072C14.5056 19.7995 12.7237 20.1594 10.9681 19.9308C9.21246 19.7022 7.5822 18.8978 6.33253 17.6437C5.08287 16.3895 4.28435 14.7564 4.062 12.9999M19.419 14.9999H15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>

                  <Button
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer"
                    style={{
                      boxShadow: "0px 2px 4px 0px #00000026",
                      color: !imageRes ? "#DADADA" : "#424242",
                    }}
                    onClick={() => {
                      setImageShow(imageShow === "AFTER" ? "BEFORE" : "AFTER");
                    }}
                    disabled={!imageRes}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 21.8182H2.66667C1.93334 21.8182 1.30534 21.6044 0.782669 21.1767C0.260002 20.7491 -0.000886625 20.2356 2.26372e-06 19.6364V4.36364C2.26372e-06 3.76364 0.261336 3.24982 0.784002 2.82218C1.30667 2.39455 1.93422 2.18109 2.66667 2.18182H8V4.36364H2.66667V19.6364H8V21.8182ZM10.6667 24V0H13.3333V24H10.6667ZM21.3333 4.36364V2.18182C22.0667 2.18182 22.6947 2.39564 23.2173 2.82327C23.74 3.25091 24.0009 3.76436 24 4.36364H21.3333ZM21.3333 13.0909V10.9091H24V13.0909H21.3333ZM21.3333 21.8182V19.6364H24C24 20.2364 23.7387 20.7502 23.216 21.1778C22.6933 21.6055 22.0658 21.8189 21.3333 21.8182ZM21.3333 8.72727V6.54545H24V8.72727H21.3333ZM21.3333 17.4545V15.2727H24V17.4545H21.3333ZM16 21.8182V19.6364H18.6667V21.8182H16ZM16 4.36364V2.18182H18.6667V4.36364H16Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                  <div className="flex flex-row items-center gap-2 ml-8 ">
                    <Button
                      className={twMerge(
                        "p-0 bg-transparent text-[#DADADA]",
                        zoomValue > 0 && "text-[#424242]"
                      )}
                      disabled={zoomValue === 0 || !imageFile}
                      onClick={() => {
                        zoomValue > 0 &&
                          rest.centerView(
                            (zoomValue - 25 < 0 ? 0 : zoomValue - 25) / 100 + 1
                          );
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.875C4.52 0.875 0.875 4.52 0.875 9C0.875 13.48 4.52 17.125 9 17.125C13.48 17.125 17.125 13.48 17.125 9C17.125 4.52 13.48 0.875 9 0.875ZM9 2.125C12.8044 2.125 15.875 5.19563 15.875 9C15.875 12.8044 12.8044 15.875 9 15.875C5.19563 15.875 2.125 12.8044 2.125 9C2.125 5.19563 5.19563 2.125 9 2.125ZM5.25 8.375V9.625H12.75V8.375H5.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                    <Slider
                      value={zoomValue}
                      onChange={(e) => {
                        rest.centerView(e / 100 + 1);
                      }}
                      disabled={!imageFile}
                      className="w-[200px] h-[24px] mt-1"
                    />
                    <Button
                      className={twMerge(
                        "p-0 bg-transparent  text-[#424242]",
                        (zoomValue === 100 || !imageFile) && "text-[#DADADA]"
                      )}
                      disabled={zoomValue === 100 || !imageFile}
                      onClick={() => {
                        zoomValue < 100 &&
                          rest.centerView(
                            (zoomValue + 25 > 100 ? 100 : zoomValue + 25) /
                              100 +
                              1
                          );
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.0625C4.072 0.0625 0.0625 4.072 0.0625 9C0.0625 13.928 4.072 17.9375 9 17.9375C13.928 17.9375 17.9375 13.928 17.9375 9C17.9375 4.072 13.928 0.0625 9 0.0625ZM9 1.4375C13.1848 1.4375 16.5625 4.81519 16.5625 9C16.5625 13.1848 13.1848 16.5625 9 16.5625C4.81519 16.5625 1.4375 13.1848 1.4375 9C1.4375 4.81519 4.81519 1.4375 9 1.4375ZM8.3125 4.875V8.3125H4.875V9.6875H8.3125V13.125H9.6875V9.6875H13.125V8.3125H9.6875V4.875H8.3125Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>

                    <div
                      className="ml-6 w-[60px] h-[30px] bg-white text-black text-[14px] font-normal flex justify-center items-center rounded"
                      style={{ border: "1px solid #DBDADA" }}
                    >
                      {zoomValue}%
                    </div>
                  </div>
                </div>
                <div className="relative ml-auto" ref={featureRef}>
                  <div
                    className={twMerge(
                      "absolute bottom-0 -left-64 invisible transition-all duration-300 ease-in-out opacity-0",
                      isShowFeature && "visible opacity-100"
                    )}
                  >
                    <ListFeature
                      action={() => imageContext.setImage(imageRes)}
                    />
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
        )}
      </TransformWrapper>
    </div>
  );
};

export default EditAnimeAi;
