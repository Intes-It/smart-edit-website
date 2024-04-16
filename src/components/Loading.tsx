import Lottie from "lottie-react";
import loadingJson from "../assets/json/loading.json";

const Loading = ({ title = "" }: { title?: string }) => {
  console.log("title", title);
  return (
    <div
      className="fixed translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2"
      style={{
        zIndex: 999999,
      }}
    >
      <div className="flex flex-col items-center justify-center py-1 px-5 rounded-lg bg-[#00000099]">
        <Lottie
          animationData={loadingJson}
          style={{
            width: 48,
          }}
          loop={true}
        />
        <div className="text-white max-w-[120px] text-sm text-center">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Loading;
