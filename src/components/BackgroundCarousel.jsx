import { useEffect, useRef, useState } from "react";
import carouselImages from "./carouselImages";

function BackgroundCarousel({ height = "30vh", interval = 3500, images = carouselImages }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [index, images.length, interval]);

  return (
    <div
      className="background-carousel"
      style={{
        width: "100vw",
        height,
        position: "relative", 
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100%",
            objectFit: "cover",
            opacity: i === index ? 1 : 0,
            transition: "opacity 1s",
            zIndex: 1,
          }}
          draggable={false}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.85) 100%)",
          zIndex: 2,
        }}
      />
    </div>
  );
}

export default BackgroundCarousel;