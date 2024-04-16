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
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    },
    {
      image: BokehBackground,
      header: "Bokeh background",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  ",
    },
    {
      image: RemovePeople,
      header: "Remove people",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    },
    {
      image: remove_wire,
      header: "Remove wire",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    },
    {
      image: face_id,
      header: "Face ID",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    },
    {
      image: pet_id_photo,
      header: "Pet ID photo",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    },

    {
      image: hot_trend,
      header: "Hot trend",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    },
    {
      image: anime_ai,
      header: "Anime AI",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    },
    {
      image: enhance_iamge,
      header: "Enhance image",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  ",
    },
    {
      image: face_change,
      header: "Face change",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
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
        loop={false}
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
            className="rounded-[20px] border-solid border-[1px] border-[#FD3B62] flex flex-col p-3"
          >
            <img
              src={item.image}
              alt="img-remove-background"
              width={"90%"}
              height={"auto"}
              className="mx-auto"
            />
            <div className="text-black text-[20px] font-medium mt-[13px] mb-2 ml-2">
              {item.header}
            </div>
            <div className="text-black text-[16px] font-normal w-1/2 ml-2">
              {item.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default OurFeature;
