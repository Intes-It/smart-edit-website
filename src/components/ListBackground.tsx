import { StepGuideProps } from "../types";

const ListBackground = ({ title, listSteps }: StepGuideProps) => {
  return (
    <div className="bg-white max-w-[1280px] pt-[68px] pb-[56px] mx-auto px-[10px]">
      <div className="text-[36px] text-[#383E42] font-semibold mb-[34px]">
        {title}
      </div>
      <div
        className="grid grid-cols-3"
        style={{
          gridTemplateColumns: `repeat(${listSteps.length}, minmax(0, 1fr))`,
        }}
      >
        {listSteps?.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.image}
              alt="image-steps"
              width={"240px"}
              className="rounded-lg"
              height={"240px"}
              style={{
                boxShadow: "0px 0px 8px 0px #0000001A",
              }}
            />
            <div className="w-[52px] my-8 h-[52px] rounded-full border-[#A451E6] text-2xl font-bold border-[3px] text-[#A451E6] flex items-center justify-center ">
              {index + 1}
            </div>
            <div className="text-black text-[20px] mx-8">
              <span className="font-bold ">Step {index + 1} : </span>
              <span className="font-normal ">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListBackground;
