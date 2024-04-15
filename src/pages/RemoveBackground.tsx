import option1 from "../assets/remove-bg-option-1.png";
import option2 from "../assets/remove-bg-option-2.png";
import option3 from "../assets/remove-bg-option-3.png";
import option4 from "../assets/remove-bg-option-4.png";
import step1 from "../assets/remove-bg-step-1.png";
import step2 from "../assets/remove-bg-step-2.png";
import step3 from "../assets/step-final.png";
import DownloadMobilePhone from "../components/DownloadMobilePhone";
import ListBackground from "../components/ListBackground";
import ListFeature from "../components/ListFeature";
import UploadImage from "../components/UploadImage";

import imageBanner from "../assets/banner-remove-bg.png";

const RemoveBackground = () => {
  const listSteps = [
    {
      image: step1,
      title: "Upload your image (file types are PNG or JPG)",
    },
    {
      image: step2,
      title: "Background from your image will be automatically removed.",
    },
    {
      image: step3,
      title: "After all, you can download your result image.",
    },
  ];
  return (
    <div>
      {/* <Checkbox defaultChecked label="I agree to sell my privacy" /> */}
      <UploadImage
        imageBanner={imageBanner}
        optionsImage={[option1, option2, option3, option4]}
        title="Blur background to highlight main image’s character"
        typeUpload="bokeh"
      />
      <ListBackground title="" listSteps={listSteps} />
      <ListFeature />
      <DownloadMobilePhone />
    </div>
  );
};

export default RemoveBackground;
