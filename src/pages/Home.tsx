// import { Checkbox } from "@mantine/core";
import UploadImage from "../components/UploadImage";
import ListBackground from "../components/ListBackground";
import ListFeature from "../components/ListFeature";
import DownloadMobilePhone from "../components/DownloadMobilePhone";
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
