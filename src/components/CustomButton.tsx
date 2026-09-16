import { useState, type ButtonHTMLAttributes, type MouseEvent, useRef } from "react";
import { cn } from "../lib/utils.ts";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "primary" | "dashed" | "text" | "link";
	size?: "sm" | "md" | "lg";
	animation?: boolean;
}

const SIZES = {
	sm: "px-2 py-1 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-8 py-3 text-lg"
};

const VARIANTS = {
	primary: "text-white bg-blue-500 hover:bg-blue-400",
	dashed: "bg-white border border-dashed border-gray-300 shadow hover:text-blue-500 hover:border-blue-500",
	link: "bg-white text-blue-500 hover:text-blue-300 active:text-blue-700",
	text: "bg-white hover:bg-gray-200 active:bg-gray-300",
	default: "bg-white border border-gray-300 shadow hover:text-blue-500 hover:border-blue-500"
};

export const CustomButton = (
	{
		variant = "default",
		size = "md",
		animation = true,
		className,
		onClick,
		children,
		...props
	}: CustomButtonProps
) => {

	const [isClicked, setIsClicked] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleClick = onClick
		? (event: MouseEvent<HTMLButtonElement>) => {
			onClick(event);

			if (animation && variant !== "text" && variant !== "link") {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}

				setIsClicked(false);

				requestAnimationFrame(() => {
					setIsClicked(true);
				});

				timeoutRef.current = setTimeout(() => {
					setIsClicked(false);
				}, 400);
			}
		}
		: undefined

	return (
			<button
				{...props}
				onClick={handleClick}
				className={cn(
					"relative max-w-xs cursor-pointer rounded-lg ring-0 ring-blue-500/60 duration-0 transition-all",
					SIZES[size],
					VARIANTS[variant],
					animation && isClicked && "ring-8 ring-transparent duration-400 ease-out",
					className
				)}
			>
				<span className="relative z-10 pointer-events-none">
					{children}
				</span>
			</button>
	);
};