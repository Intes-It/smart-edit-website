// import { Checkbox } from "@mantine/core";
import UploadImage from "./UploadImage";
import ListBackground from "./ListBackground";
import ListFeature from "./ListFeature";
import DownloadMobilePhone from "./DownloadMobilePhone";
const Home = () => {
  return (
    <div>
      {/* <Checkbox defaultChecked label="I agree to sell my privacy" /> */}
      <UploadImage />
      <ListBackground />
      <ListFeature />
      <DownloadMobilePhone />
    </div>
  );
};

export default Home;
