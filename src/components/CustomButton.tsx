import { useState, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { cn } from "../../lib/utils.ts";

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

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event);

		if (variant !== "text" && variant !== "link" && animation && !isClicked) {
			setIsClicked(true);
			setTimeout(() => setIsClicked(false), 300);
		}
	};

	const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
		...props,
		...(onClick ? {onClick: handleClick} : {}),
		onAnimationEnd: () => setIsClicked(false)
	};

	return (
		<>
			<style>{`
				@keyframes custom-click-ping {
					0% { transform: scale(1); opacity: 1; }
					100% { transform: scaleY(1.4) scaleX(1.15); opacity: 0; }
				}
			`}</style>

			<button
				{...buttonProps}
				className={cn(
					"relative max-w-xs cursor-pointer rounded-lg transition-all duration-300 ease-in-out isolate bg-transparent",
					SIZES[size],
					VARIANTS[variant],
					className
				)}
			>
				{isClicked && (
					<span className="absolute inset-0 -z-10 rounded-lg bg-blue-400/60 animate-[custom-click-ping_300ms_ease-in_1]"/>
				)}

				<span className="relative z-10 pointer-events-none">
					{children}
				</span>
			</button>
		</>
	);
};
