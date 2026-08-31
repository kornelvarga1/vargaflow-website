import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import vfIcon from "@/assets/vf-icon.png";
import { WALKTHROUGH_VIDEO_URL, WALKTHROUGH_POSTER_URL } from "@/config/constants";

const Video = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>VargaFlow — Walkthrough</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center gap-2.5">
          <img src={vfIcon} alt="VargaFlow" className="h-8 w-8 rounded-md" />
          <span className="text-lg font-bold tracking-tight text-foreground">VargaFlow</span>
        </div>
      </header>

      <main className="bg-background py-10 md:py-16">
        <div className="container max-w-3xl px-3 md:px-6">
          <h1 className="text-center text-[1.65rem] font-extrabold leading-[1.2] text-foreground md:text-4xl md:leading-[1.15] lg:text-5xl">
            I help contractors get more jobs with smart websites, 5-star reviews, and automated lead follow-up
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-base font-medium text-foreground md:text-lg md:mt-4 lg:text-xl">
            For just $300/mo · free setup · no contracts.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-black shadow-lg md:mt-10">
            <video
              className="aspect-video w-full"
              src={WALKTHROUGH_VIDEO_URL}
              poster={WALKTHROUGH_POSTER_URL}
              controls
              playsInline
              preload="metadata"
            />
          </div>

          <div className="mt-12 md:mt-16">
            <h2 className="text-center text-2xl font-extrabold text-foreground md:text-3xl">
              Book a call
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
              20 minutes with Kornél.
            </p>
            <div className="mt-6 w-full overflow-hidden">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/kornelvarga/vargaflow-consulting-call?hide_gdpr_banner=1&primary_color=1a1a1a"
                style={{ minWidth: "320px", width: "100%", height: "950px" }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Video;
