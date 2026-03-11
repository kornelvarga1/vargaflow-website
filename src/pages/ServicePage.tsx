import { useParams, Navigate } from "react-router-dom";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { serviceData } from "@/data/services";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !serviceData[slug]) {
    return <Navigate to="/" replace />;
  }

  return <ServicePageTemplate data={serviceData[slug]} />;
};

export default ServicePage;
