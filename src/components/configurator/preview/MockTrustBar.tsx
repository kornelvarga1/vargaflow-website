interface MockTrustBarProps {
  accentColor: string;
}

const ITEMS = [
  "100% Local",
  "15+ Years Experience",
  "Top Notch Service",
  "Insured",
  "Fully Licensed",
];

const MockTrustBar = ({ accentColor }: MockTrustBarProps) => (
  <div className="bg-white py-[6px] px-5 shrink-0">
    <p className="text-center text-[5.5px] font-semibold tracking-wide text-[#1a1a1a]">
      {ITEMS.map((item, i) => (
        <span key={item}>
          {i > 0 && (
            <span
              className="mx-[5px] inline-block h-[3px] w-[3px] rotate-45 align-middle"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            />
          )}
          {item}
        </span>
      ))}
    </p>
  </div>
);

export default MockTrustBar;
