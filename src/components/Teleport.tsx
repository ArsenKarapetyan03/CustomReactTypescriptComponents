import { type ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TeleportProps {
	children: ReactNode;
	to?: string;
	belongs?: string;
}

const Teleport = (
	{
		children,
		to = "#root",
	}: TeleportProps) => {

	const [mountedElement, setMountedElement] = useState<Element | null>(null);

	useLayoutEffect(() => {
		const element = document.querySelector(to) || document.body;
		setMountedElement(element);
	},[to])

	if (!mountedElement) return null;

	return createPortal(children,	mountedElement)
}

export default Teleport