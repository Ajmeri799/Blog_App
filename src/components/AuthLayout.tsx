import React, { useEffect, useState, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store"; // Import the RootState type from your store

interface ProtectedProps {
  children: ReactNode; // Type for children props
  authentication?: boolean; // Optional authentication prop, defaulting to true
}

export default function Protected({
  children,
  authentication = true,
}: ProtectedProps) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  // Assuming your state.auth.status is a boolean or similar, you can type it accordingly
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
