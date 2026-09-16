import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface TeleportProps {
	children: ReactNode;
	to?: string;
	belongs?: string;
}

export const Teleport = (
	{
		children,
		to = "#root",
	}: TeleportProps) => {

	const container = document.querySelector(to) || document.body;

	return createPortal(children,	container);
}