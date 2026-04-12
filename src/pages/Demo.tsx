import { Helmet } from "react-helmet-async";
import ConfiguratorPage from "@/components/configurator/ConfiguratorPage";

const Demo = () => (
  <>
    <Helmet>
      <title>See It In Action — VargaFlow</title>
      <meta
        name="description"
        content="Build your contractor website live. Pick your trade, choose your colors, see your site come to life — free setup, no contracts."
      />
    </Helmet>
    <ConfiguratorPage />
  </>
);

export default Demo;
