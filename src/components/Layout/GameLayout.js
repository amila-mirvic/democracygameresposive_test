import React from "react";
import styles from "./GameLayout.module.css";

const BASE_W = 1920;
const BASE_H = 1080;

export default function GameLayout({ backgroundImage, children }) {
  const [{ scale, isLargeDesktop }, setMetrics] = React.useState({
    scale: 1,
    isLargeDesktop: true,
  });

  React.useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const large = w >= 1280;
      // ✅ Large desktop: preserve original "fit-to-viewport and centered" behavior.
      // ✅ <1280: prioritize usability; allow vertical scroll by scaling to width and top-aligning.
      const nextScale = large ? Math.min(w / BASE_W, h / BASE_H) : w / BASE_W;

      setMetrics({ scale: nextScale, isLargeDesktop: large });
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div
      className={styles.viewport}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div
        className={styles.stage}
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: isLargeDesktop
            ? `translate(-50%, -50%) scale(${scale})`
            : `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
