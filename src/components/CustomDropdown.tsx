import { type AnchorHTMLAttributes, useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { CustomButton } from "./CustomButton.tsx";
import { cn } from "../../lib/utils.ts";
import Teleport from "./Teleport.tsx";

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
	const [dropdownCoords, setDropdownCoords] = useState({top: 0, left: 0, width: 0});
	const triggerRef = useRef<HTMLSpanElement>(null);

	const chevronRotation = isOpen
		? direction === "up" ? "-rotate-90" : "rotate-90"
		: "rotate-0";

	const handleClick = () => {
		if (trigger === "click") {
			setIsOpen((prev) => !prev);
		}
	};

	const updatePosition = () => {
		if (triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			setDropdownCoords({
				top: direction === "down" ? rect.bottom + window.scrollY : rect.top + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width,
			});
		}
	}

	useEffect(() => {
		if (isOpen) {
			updatePosition();
			window.addEventListener("resize", updatePosition);
			window.addEventListener("scroll", updatePosition);
		}
		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition);
		};
	}, [isOpen, direction]);

	return (
		<div
			className="relative group max-w-40 font-sans text-sm text-zinc-800"
			onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
			onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
		>
			<span ref={triggerRef} className="inline-block">
				<CustomButton
					type="button"
					onClick={handleClick}
					animation={false}
					className="flex items-center gap-2 text-nowrap text-blue-500 duration-200"
				>
					{title}

					<ChevronRight className={cn("inline transition-transform duration-300", chevronRotation)}/>
				</CustomButton>
				</span>

			{isOpen && (
				<Teleport>
					<ul
						className={"absolute z-10 w-48 bg-white rounded-lg border border-gray-100 shadow-2xl"}
						style={{
							left: `${dropdownCoords.left}px`,
							top: `${dropdownCoords.top}px`,
							transform: direction === "up" ? "translateY(-100%)" : "none",
						}}
						onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
						onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
					>
						{menuItems.map((item, index) => {
							const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
								...item.anchorProps,
								...(item.disabled && {
									href: undefined,
									onClick: undefined,
								}),
							};

							return (
								<li key={index}>
									<a
										{...anchorProps}
										className={cn(
											"block px-4 py-2 m-1 rounded transition-colors duration-200 text-zinc-800 hover:bg-zinc-200",
											item.disabled && "text-gray-400 bg-transparent cursor-not-allowed pointer-events-none",
											item.danger && "text-red-500 hover:bg-red-500 hover:text-white",
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
				</Teleport>
			)}
		</div>
	);
};
