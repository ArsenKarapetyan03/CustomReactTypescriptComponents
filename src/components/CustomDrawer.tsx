import { type ReactNode } from "react";
import { cn } from "../../lib/utils.ts";

interface CustomDrawerProps {
	title: string;
	open: boolean;
	setOpen: (open: boolean) => void;
	placement?: "top" | "bottom" | "left" | "right";
	size?: number;
	children?: ReactNode;
}

export const CustomDrawer = (
	{
		title,
		open,
		setOpen,
		placement = "right",
		size = 300,
		children,
	}: CustomDrawerProps) => {

	const isHorizontal = placement === "left" || placement === "right";

	const sizeStyle =
		isHorizontal
		? {width: `${size}px` } : {height: `${size}px`};

	const placementClasses = {
		top: "top-0 left-0 w-full",
		bottom: "bottom-0 left-0 w-full",
		left: "left-0 top-0 h-full",
		right: "right-0 top-0 h-full",
	};

	const closedTransformClasses = {
		top: "-translate-y-full",
		bottom: "translate-y-full",
		left: "-translate-x-full",
		right: "translate-x-full",
	};

	return (
		<>
			<div
				onClick={() => setOpen(false)}
				className={cn(
					"fixed z-10 inset-0 bg-zinc-400/50 transition-opacity duration-300",
					open ? "opacity-100" : "pointer-events-none opacity-0"
				)}
			/>
			<div
				className={cn(
					"fixed z-20 bg-white shadow-xl transition-transform duration-300 ease-in-out",
					placementClasses[placement],
					open ? "translate-x-0 translate-y-0" : closedTransformClasses[placement]
				)}
				style={sizeStyle}
			>
				<div className="flex items-center justify-between border-b p-4">
					<h2 className="text-lg font-semibold">{title}</h2>
					<button
						onClick={() => setOpen(false)}
						className="rounded-md p-2 hover:bg-gray-100"
					>
						✕
					</button>
				</div>
				{children}
			</div>
		</>
	);
};
