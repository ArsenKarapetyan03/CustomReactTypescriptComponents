import { type ReactNode, useState } from "react";
import { cn } from "../lib/utils.ts";

interface Tab {
	title: string;
	content: string | ReactNode;
	disabled?: boolean;
}

interface CustomTabsProps {
	tabs: Tab[];
	defaultActiveTab?: number;
	centered?: boolean;
	size?: "sm" | "md" | "lg";
	variant?: "default" | "card";
}

const SIZES = {
	sm: "px-2 py-1 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-8 py-4 text-lg"
};

export const CustomTabs = (
	{
		tabs,
		defaultActiveTab = 0,
		centered = false,
		size = "md",
		variant = "default",
	}: CustomTabsProps
) => {

	const [activeTab, setActiveTab] = useState(Math.min(Math.max(0, defaultActiveTab), tabs.length - 1));

	const handleTabClick = (tab: number) => {
		setActiveTab(tab);
	}

	return (
		<div className={`flex flex-col ${SIZES[size]}`}>
			{/*Tab titles*/}
			<div className={`flex gap-5 border-b border-gray-100 overflow-x-auto ${centered ? "justify-center" : ""}`}>
				{tabs.map((tab, index) => (
					<button
						key={tab.title}
						disabled={tab.disabled}
						onClick={() => handleTabClick(index)}
						className={
							cn(
								"px-2 py-1 text-nowrap cursor-pointer border-b-2 border-transparent transition duration-300",
								`${
									activeTab === index
										? variant === "card"
											? "rounded-tl-md rounded-tr-md bg-gray-100"
											: "text-blue-500 border-blue-500"
										: ""
								}`,
								`${tab.disabled ? "text-gray-300" : ""}`
							)
						}
					>
						{tab.title}
					</button>
				))}
			</div>
			{/*Tab content*/}
			<div className={`p-2 ${variant === "card" ? "bg-gray-100" : ""}`}>
				{tabs[activeTab].disabled ? null : tabs[activeTab].content}
			</div>
		</div>
	)
}