import iconSmartEdit from "../../assets/IconSmartEdit.png";
const AboutUs = () => {
  return (
    <div className="pt-[7%] px-[10%] bg-[#f0f0f0]">
      <div className="bg-white pt-[10%] px-[10%] pb-[20%]">
        <img
          src={iconSmartEdit}
          alt="icon"
          className="w-[250px] h-[250px] mx-auto"
        />
        <div className="pt-14 text-[28px] text-black flex justify-center ">
          <span className=" font-bold">SmartEdit</span>
          <span className="font-normal ml-3"> version 1.0.0</span>
        </div>
        <div className="mx-[10%] mt-32 text-[24px] text-black text-center ">
          <span className="font-normal">
            Do you have any image that contains unexpected background or
            objects.{" "}
          </span>
          <span className="font-semibold">SmartEdit</span>{" "}
          <span className="font-normal">
            will help you to remove the background. And more than that,you can
            also add other background to the image,text,color,... Just try our
            app.
          </span>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
