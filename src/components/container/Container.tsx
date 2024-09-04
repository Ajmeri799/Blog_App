import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="w-full max-w-7xl px-4 mx-auto">{children}</div>;
}

export default Container;
