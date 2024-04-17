import Lottie from "lottie-react";
import loadingJson from "../assets/json/loading.json";

const Loading = ({ title = "" }: { title?: string }) => {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen "
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
