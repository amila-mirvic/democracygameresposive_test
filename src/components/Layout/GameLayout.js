import React from "react";
import styles from "./GameLayout.module.css";

const BASE_W = 1920;
const BASE_H = 1080;

// Breakpoints (matching the provided spec)
const BP_TABLET_MAX = 1023;

export default function GameLayout({ backgroundImage, children }) {
  const [scale, setScale] = React.useState(1);
  const [isFluid, setIsFluid] = React.useState(false);

  React.useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // ✅ Desktop/laptop keep the exact 1920×1080 layout (scaled to fit)
      // ✅ Tablet/mobile switch to a fluid stage so we can optimize UX
      const fluid = w <= BP_TABLET_MAX;
      setIsFluid(fluid);

      if (!fluid) {
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
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div
        className={[styles.stage, isFluid ? styles.stageFluid : styles.stageFixed].join(" ")}
        style={{
          width: isFluid ? "100%" : BASE_W,
          height: isFluid ? "100%" : BASE_H,
          transform: isFluid ? "none" : `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
