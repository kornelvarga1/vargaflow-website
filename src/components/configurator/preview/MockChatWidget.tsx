import { MessageCircle, X } from "lucide-react";

interface MockChatWidgetProps {
  accentColor: string;
  accentTextColor: string;
}

const MockChatWidget = ({ accentColor, accentTextColor }: MockChatWidgetProps) => (
  <>
    {/* Teaser popup */}
    <div
      className="absolute bottom-[58px] right-4 z-30 max-w-[180px] rounded-xl rounded-br-sm border border-black/10 px-[10px] py-[8px]"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      }}
    >
      <p className="text-[6.5px] text-gray-700 leading-snug pr-3">
        Shoot me any questions and I'll get back to you as soon as I'm free!
      </p>
      <div className="absolute top-[5px] right-[5px]">
        <X size={5} className="text-gray-400" />
      </div>
    </div>

    {/* Floating button */}
    <div
      className="absolute bottom-[10px] right-4 z-30 flex h-[36px] w-[36px] items-center justify-center rounded-full"
      style={{
        backgroundColor: accentColor,
        boxShadow: `0 4px 24px ${accentColor}55, 0 2px 8px rgba(0,0,0,0.4)`,
      }}
    >
      <MessageCircle size={18} style={{ color: accentTextColor }} />
    </div>
  </>
);

export default MockChatWidget;
