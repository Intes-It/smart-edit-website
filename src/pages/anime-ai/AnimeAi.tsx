import step1 from "../../assets/anime-ai-step-1.png";
import step2 from "../../assets/anime-ai-step-2.png";
import banner from "../../assets/banner-anime-ai.png";
import img1 from "../../assets/remove-bg-option-1.png";
import img2 from "../../assets/remove-bg-option-2.png";
import img3 from "../../assets/remove-bg-option-3.png";
import img4 from "../../assets/remove-bg-option-4.png";
import step3 from "../../assets/step-final.png";
import DownloadMobilePhone from "../../components/DownloadMobilePhone";
import ListBackground from "../../components/ListBackground";
import OurFeature from "../../components/OurFeature";
import UploadImage from "../../components/UploadImage";

const AnimeAi = () => {
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
        optionsImage={[img1, img2, img3, img4]}
        title="Change your image into anime version"
        typeUpload="anime-ai"
      />
      <ListBackground
        title="Steps to become anime vesion."
        listSteps={listSteps}
      />
      <OurFeature />
      <DownloadMobilePhone />
    </div>
  );
};

export default AnimeAi;
