import React from "react";
interface LogoProps {
  width?: string;
}

function Logo({ width = "100px" }: LogoProps) {
  return <div style={{ width }}>Logo</div>;
}

export default Logo;
