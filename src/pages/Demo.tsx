import { Helmet } from "react-helmet-async";
import ConfiguratorPage from "@/components/configurator/ConfiguratorPage";

const Demo = () => (
  <>
    <Helmet>
      <title>Configure Your Website — VargaFlow</title>
      <meta
        name="description"
        content="Configure your contractor website live. Pick your trade, choose your colors, type your name — see exactly what yours would look like. Free setup, no contracts."
      />
    </Helmet>
    <ConfiguratorPage />
  </>
);

export default Demo;
