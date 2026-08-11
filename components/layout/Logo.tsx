"use client";

import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 40, height = 40, className = "" }: LogoProps) {
  return (
    <Image
      src="/images/logo/sree-durga-logo.png"
      alt="Sree Durga Food Industries"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      unoptimized
    />
  );
}