interface MockLogoProps {
  accentColor: string;
  companyName: string;
  logoUrl: string | null;
}

const MockLogo = ({ accentColor, companyName, logoUrl }: MockLogoProps) => {
  const [mainName, subName] = companyName.includes("&")
    ? companyName.split(" & ")
    : [companyName, null];

  return (
    <div className="flex items-center gap-[3px]">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt=""
          className="h-[14px] w-auto object-contain shrink-0"
        />
      ) : (
        <svg
          width="16"
          height="13"
          viewBox="0 0 38 32"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect x="3" y="17" width="32" height="15" rx="1.5" fill="rgba(255,255,255,0.12)" />
          <path d="M0 18.5L19 1L38 18.5H0Z" fill={accentColor} />
          <rect x="25" y="2.5" width="5" height="10" rx="1" fill={accentColor} />
          <rect x="13.5" y="22" width="11" height="10" rx="1" fill={accentColor} fillOpacity={0.35} />
        </svg>
      )}
      <div className="flex flex-col leading-none gap-[1px]">
        <span className="text-[6px] font-extrabold tracking-tight leading-none text-white">
          {mainName}
        </span>
        {subName && (
          <span
            className="text-[4px] font-bold tracking-[0.18em] uppercase leading-none"
            style={{ color: accentColor }}
          >
            &amp; {subName}
          </span>
        )}
      </div>
    </div>
  );
};

export default MockLogo;
