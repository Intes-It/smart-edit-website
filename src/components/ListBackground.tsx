import StepsBacground1 from "../assets/steps_background_1.svg";
import StepsNumber1 from "../assets/steps_number1.svg";
import StepsNumber2 from "../assets/steps_number2.svg";
import StepsNumber3 from "../assets/steps_number3.svg";
const ListBackground = () => {
  const listSteps = [
    {
      image: StepsBacground1,
      number: StepsNumber1,
      content: "Upload your image (file types are PNG or JPG)",
    },
    {
      image: StepsBacground1,
      number: StepsNumber2,
      content: "Background from your image will be automatically removed.",
    },
    {
      image: StepsBacground1,
      number: StepsNumber3,
      content: "After all, you can download your result image.",
    },
  ];
  return (
    <div className="bg-white px-20 pt-[68px] pb-[56px]">
      <div className="text-[36px] text-[#383E42] font-semibold mb-[34px]">
        Steps to blur background.
      </div>
      <div className=" flex flex-wrap">
        {listSteps?.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-1/3">
            <img
              src={item.image}
              alt="image-steps"
              width={"240px"}
              height={"240px"}
            />
            <img
              src={item.number}
              alt="image-steps"
              width={"52px"}
              height={"52px"}
              className="mt-[34px] mb-[24px]"
            />
            <div className="text-black text-[20px] mx-8">
              <span className="font-bold ">Step {index + 1} : </span>
              <span className="font-normal  ">{item.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListBackground;
