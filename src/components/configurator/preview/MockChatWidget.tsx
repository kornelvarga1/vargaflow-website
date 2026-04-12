import { MessageCircle, X } from "lucide-react";

interface MockChatWidgetProps {
  accentColor: string;
}

const MockChatWidget = ({ accentColor }: MockChatWidgetProps) => (
  <>
    {/* Teaser popup */}
    <div
      className="absolute bottom-[38px] right-3 z-30 max-w-[120px] rounded-xl rounded-br-sm border border-black/10 px-[6px] py-[5px]"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      }}
    >
      <p className="text-[4px] text-gray-700 leading-snug pr-2">
        Shoot me any questions and I'll get back to you as soon as I'm free!
      </p>
      <div className="absolute top-[3px] right-[3px]">
        <X size={3} className="text-gray-400" />
      </div>
    </div>

    {/* Floating button */}
    <div
      className="absolute bottom-[6px] right-3 z-30 flex h-[24px] w-[24px] items-center justify-center rounded-full"
      style={{
        backgroundColor: accentColor,
        boxShadow: `0 4px 24px ${accentColor}55, 0 2px 8px rgba(0,0,0,0.4)`,
      }}
    >
      <MessageCircle size={12} className="text-white" />
    </div>
  </>
);

export default MockChatWidget;
