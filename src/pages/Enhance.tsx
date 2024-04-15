import banner from "../assets/banner-enhance.png";
import img2 from "../assets/enhance-option-2.png";
import img3 from "../assets/enhance-option-3.png";
import img4 from "../assets/enhance-option-4.png";
import step1 from "../assets/enhance-step-1.png";
import {
  default as img1,
  default as step2,
} from "../assets/enhance-step-2.png";
import step3 from "../assets/step-final.png";
import DownloadMobilePhone from "../components/DownloadMobilePhone";
import ListBackground from "../components/ListBackground";
import ListFeature from "../components/ListFeature";
import UploadImage from "../components/UploadImage";

const Enhance = () => {
  const listSteps = [
    {
      image: step1,
      title: "Upload your image (file types are PNG or JPG)",
    },
    {
      image: step2,
      title: "Your blurry image will be sharpen.",
    },
    {
      image: step3,
      title: "After all, you can download your result image.",
    },
  ];
  return (
    <div>
      <UploadImage
        imageBanner={banner}
        optionsImage={[img1, img2, img3, img4]}
        title="Sharpen your blurry image"
        typeUpload="face-id"
      />
      <ListBackground
        title="Steps to sharpen your image."
        listSteps={listSteps}
      />
      <ListFeature />
      <DownloadMobilePhone />
    </div>
  );
};

export default Enhance;
