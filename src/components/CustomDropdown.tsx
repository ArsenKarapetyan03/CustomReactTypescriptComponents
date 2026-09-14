import { type AnchorHTMLAttributes, useState } from "react";
import { CustomButton } from "./CustomButton.tsx";
import { cn } from "../../lib/utils.ts";
import { ChevronDown } from "lucide-react";

interface DropdownLink {
	label: string;
	disabled?: boolean;
	danger?: boolean;
	anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

interface CustomDropdownProps {
	title: string;
	menuItems: DropdownLink[];
	direction?: "up" | "down";
	trigger?: "hover" | "click";
}

export const CustomDropdown = (
	{
		title = "Menu",
		direction = "down",
		trigger = "hover",
		menuItems,
	}: CustomDropdownProps) => {

	const [isOpen, setIsOpen] = useState(false);

	const dropdownPosition =
		direction === "up"
			? "bottom-full left-0"
			: "top-full left-0";

	const chevronRotation =
		direction === "up"
			? "rotate-180"
			: "";

	const dropdownVisibility =
		trigger === "hover"
			? "hidden group-hover:block"
			: isOpen
				? "block"
				: "hidden";

	const handleClick = () => {
		if (trigger === "click") {
			setIsOpen((prev) => !prev);
		}
	};

	return (
		<div className="relative group max-w-40 font-sans text-sm text-zinc-800">
			<CustomButton
				type="button"
				onClick={handleClick}
				animation={false}
				className="flex items-center gap-2 whitespace-nowrap text-blue-600 hover:text-blue-800 transition-all duration-300"
				aria-expanded={trigger === "click" ? isOpen : undefined}
			>
				{title}

				<ChevronDown
					className={`transition-transform duration-300 ${
						trigger === "click"
							? isOpen
								? "rotate-180"
								: chevronRotation
							: direction === "up"
								? "group-hover:rotate-0"
								: "group-hover:rotate-180"
					}`}
				/>
			</CustomButton>

			<ul
				className={`absolute ${dropdownVisibility} z-10 w-48 bg-white rounded-lg border border-gray-100 shadow-2xl ${dropdownPosition}`}>
				{menuItems.map((item, index) => {
					const linkStyles = item.disabled
						? "text-gray-400 bg-transparent cursor-not-allowed pointer-events-none"
						: item.danger
							? "text-red-500 hover:bg-red-500 hover:text-white"
							: "text-zinc-800 hover:bg-zinc-200";

					const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
						...item.anchorProps,
						...(item.disabled && {
							href: undefined,
							onClick: undefined,
							"aria-disabled": true,
						}),
					};

					return (
						<li key={index}>
							<a
								{...anchorProps}
								className={cn(
									"block px-4 py-2 m-1 rounded transition-colors duration-200",
									linkStyles,
									anchorProps.onClick && "cursor-pointer",
									anchorProps.className
								)}
							>
								{item.label}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
