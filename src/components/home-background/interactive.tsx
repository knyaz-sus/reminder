"use client";

import styles from "./home-background.module.css";
import { useEffect, useRef} from "react";

export function Interactive() {
  const mousePos = useRef({ x: 0, y: 0 });
  const updatedPos = useRef({ x: 0, y: 0 });
  const interactiveRef = useRef<HTMLDivElement>(null);
  const requestId = useRef<number>(null);

  useEffect(() => {
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    updatedPos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const move = () => {
      if (!interactiveRef.current) return;
      updatedPos.current.x += (mousePos.current.x - updatedPos.current.x) / 20;
      updatedPos.current.y += (mousePos.current.y - updatedPos.current.y) / 20;

      interactiveRef.current.style.transform = `translate(${updatedPos.current.x}px, ${updatedPos.current.y}px)`;

      requestId.current = requestAnimationFrame(move);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    requestId.current = requestAnimationFrame(move);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestId.current) cancelAnimationFrame(requestId.current);
    };
  }, []);

  return (
    <div
      style={{ transform: "translate(50%, 50%)" }}
      ref={interactiveRef}
      className={styles.interactive}
    />
  );
}
