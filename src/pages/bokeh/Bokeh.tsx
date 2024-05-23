import step2 from "../../assets/bokeh-step-2.png";
import img1 from "../../assets/imageUser.png";
import img2 from "../../assets/young-adult-tokyo-streets 1.png";
import img3 from "../../assets/young-people-urban-scene-with-k-pop-aesthetics 1.png";
import img4 from "../../assets/friends-roller-skating-park 1.png";
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
      title: "Background from your image will be automatically removed",
    },
    {
      image: step3,
      title: "After all, you can download your result image",
    },
  ];
  return (
    <div>
      <UploadImage
        imageBanner={banner}
        optionsImage={[img1, img2, img3, img4]}
        title="Blur background to highlight main image’s character"
        typeUpload="bokeh"
      />
      <ListBackground title="Steps to blur background" listSteps={listSteps} />
      <OurFeature />
      <DownloadMobilePhone />
    </div>
  );
};

export default Bokeh;
