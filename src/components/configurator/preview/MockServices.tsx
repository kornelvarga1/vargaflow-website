import { ArrowRight } from "lucide-react";
import type { NicheService } from "@/data/configurator-niches";

interface MockServicesProps {
  accentColor: string;
  services: NicheService[];
}

const MockServices = ({ accentColor, services }: MockServicesProps) => (
  <div className="px-8 py-6 bg-white">
    <p
      className="text-[6px] font-bold uppercase tracking-[0.2em] mb-1"
      style={{ color: accentColor }}
    >
      What We Do
    </p>
    <h2 className="text-[14px] font-extrabold text-[#1a1a1a] tracking-tight mb-4">
      Our Services
    </h2>
    <div className="grid grid-cols-3 gap-3">
      {services.map((svc) => (
        <div key={svc.name} className="relative rounded-sm overflow-hidden group h-[90px]">
          <img
            src={svc.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2 flex items-end justify-between">
            <span className="text-[6px] font-bold text-white">{svc.name}</span>
            <span
              className="w-3 h-3 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              <ArrowRight size={6} className="text-white" />
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MockServices;
