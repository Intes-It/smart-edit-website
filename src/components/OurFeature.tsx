import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import anime_ai from "../assets/anime_ai.png";
import BokehBackground from "../assets/bokeh_background.svg";
import enhance_iamge from "../assets/enhance_iamge.png";
import face_change from "../assets/face_change.png";
import face_id from "../assets/face_id.png";
import hot_trend from "../assets/hot_trend.png";
import pet_id_photo from "../assets/pet_id_photo.png";
import RemoveBackground from "../assets/remove_background.svg";
import RemovePeople from "../assets/remove_people.svg";
import remove_wire from "../assets/remove_wire.png";

const OurFeature = () => {
  const listSteps = [
    {
      image: RemoveBackground,
      header: "Remove background",
      content: "Remove the background from image fast and easily",
    },
    {
      image: BokehBackground,
      header: "Bokeh background",
      content: "Blur the background in order to highlight main object",
    },
    {
      image: RemovePeople,
      header: "Remove people",
      content: "Remove unexpected people or object",
    },
    {
      image: remove_wire,
      header: "Remove wire",
      content: "Remove wire from picture",
    },
    {
      image: face_id,
      header: "Face ID",
      content: "Edit your image into a passport or ID photo version",
    },
    {
      image: pet_id_photo,
      header: "Pet ID photo",
      content: "Create your pet ID photo",
    },

    {
      image: hot_trend,
      header: "Hot trend",
      content:
        "Hot trend filter to transform your photo to become fore interesting",
    },
    {
      image: anime_ai,
      header: "Anime AI",
      content: "Anime filter for your photo",
    },
    {
      image: enhance_iamge,
      header: "Enhance image",
      content: "Sharpen your blurry image",
    },
    {
      image: face_change,
      header: "Face change",
      content: "Swap your face with face from selected image",
    },
  ];
  return (
    <div className="bg-white px-20 pt-[35px] ">
      <div className="text-[36px] text-[#383E42] font-semibold mb-[34px]">
        Our feature
      </div>
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {listSteps?.map((item, index) => (
          <SwiperSlide
            key={index}
            className="rounded-[20px] border-solid border-[1px] border-[#FD3B62] flex flex-col p-3 min-h-[410px]"
          >
            <img
              src={item.image}
              alt="img-remove-background"
              width={"90%"}
              height={"auto"}
              className="mx-auto"
              style={{ borderRadius: "20px" }}
            />
            <div className="text-black text-[20px] font-medium mt-[13px] mb-2 ml-2">
              {item.header}
            </div>
            <div className="text-black text-[16px] font-normal w-2/3 ml-2">
              {item.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default OurFeature;
