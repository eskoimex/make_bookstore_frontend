import React, { useState } from "react";
import Image from "next/image";

interface IProps {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
}

const fallbackSrc = "./assets/fallback-cover-image.svg";

const ImageWithFallback = (props: IProps) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      style={{
        width: rest.width,
        height: rest.height,
      }}
      alt={props.alt}
      width={"187"}
      height={"187"}
      src={imgSrc}
      priority
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
