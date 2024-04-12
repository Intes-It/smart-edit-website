import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";
import RemoveBackground from "../assets/remove_background.svg";
import RemovePeople from "../assets/remove_people.svg";
import BokehBackground from "../assets/bokeh_background.svg";

const ListFeature = () => {
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
export default ListFeature;
