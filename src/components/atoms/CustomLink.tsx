import React from "react";
import { Link } from "react-router-dom";

interface LinkProps {
  to: string;
  state?: unknown;
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
}

const CustomLink: React.FC<LinkProps> = ({
  to,
  state = {},
  children,
  customStyles,
}) => {
  return (
    <Link
      to={to}
      state={state}
      style={{ textDecoration: "none", color: "inherit", ...customStyles }}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
