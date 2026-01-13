import React from "react";
import styles from "./GameLayout.module.css";

const BASE_W = 1920;
const BASE_H = 1080;
const MOBILE_BP = 1024;

export default function GameLayout({ backgroundImage, children }) {
  const [scale, setScale] = React.useState(1);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BP : false
  );

  React.useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const mobile = w < MOBILE_BP;
      setIsMobile(mobile);

      // Desktop/laptop: keep the exact same 1920x1080 stage, just scaled to fit.
      if (!mobile) {
        setScale(Math.min(w / BASE_W, h / BASE_H));
      }
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div
      className={styles.viewport}
      data-mode={isMobile ? "fluid" : "fixed"}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div
        className={styles.stage}
        style={
          isMobile
            ? {
                width: "100%",
                minHeight: "100svh",
              }
            : {
                width: BASE_W,
                height: BASE_H,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }
        }
      >
        {children}
      </div>
    </div>
  );
}
