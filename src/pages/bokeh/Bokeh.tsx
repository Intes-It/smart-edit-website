import step2 from "../../assets/bokeh-step-2.png";
import img1 from "../../assets/imageUser.png";
import banner from "../../assets/picture_before_after.svg";
import step3 from "../../assets/step-final.png";
import step1 from "../../assets/steps_background_1.svg";
import DownloadMobilePhone from "../../components/DownloadMobilePhone";
import ListBackground from "../../components/ListBackground";
import OurFeature from "../../components/OurFeature";
import UploadImage from "../../components/UploadImage";

const Bokeh = () => {
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
      <UploadImage
        imageBanner={banner}
        optionsImage={[img1, img1, img1, img1]}
        title="Blur background to highlight main image’s character"
        typeUpload="bokeh"
      />
      <ListBackground title="Steps to blur background." listSteps={listSteps} />
      <OurFeature />
      <DownloadMobilePhone />
    </div>
  );
};

export default Bokeh;
