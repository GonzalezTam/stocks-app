import React from "react";
import { Link } from "react-router-dom";

interface LinkProps {
	to: string;
	children: React.ReactNode;
	customStyles?: React.CSSProperties
}

const CustomLink: React.FC<LinkProps> = ({ to, children, customStyles }) => {
	return (
		<Link to={to} style={customStyles}>
			{children}
		</Link>
	);
}

export default CustomLink;