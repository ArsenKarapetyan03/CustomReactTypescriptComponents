import { type HTMLAttributes, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils.ts";

interface Panel {
	title: string;
	content: string;
}

interface CollapsiblePanelProps extends HTMLAttributes<HTMLDivElement> {
	panels: Panel[];
	size?: "sm" | "md" | "lg";
	accordion?: boolean;
	defaultActivePanels?: number[];
}

export function CollapsiblePanel(
	{
		panels,
		size = "md",
		accordion = false,
		defaultActivePanels = [],
		className,
	}: CollapsiblePanelProps) {

	const [openPanels, setOpenPanels] = useState<number[]>(
		accordion
			? [defaultActivePanels[0]]
			: defaultActivePanels
	);

	const handleCollapse = (index: number) => {
		if (accordion) {
			setOpenPanels(prev =>
				prev.includes(index)
					? []
					: [index]);
			return;
		}
		setOpenPanels(prev =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]);
	};

	return (
		<div className={className}>
			{panels.map((panel, i) => {
				const open = openPanels.includes(i);

				return (
					<div
						key={i}
						className={cn(
							`text-${size} overflow-hidden border border-zinc-300`,
							!i ? "rounded-tr-lg rounded-tl-lg" : "",
							i == panels.length - 1 ? "rounded-br-lg rounded-bl-lg" : "",
						)}
					>
						<button
							type="button"
							onClick={() => handleCollapse(i)}
							className="min-h-10 w-full px-4 py-2 flex items-center gap-2 bg-zinc-100 cursor-pointer"
						>
							<ChevronRight
								size={size === "sm" ? 16 : size === "lg" ? 24 : 20}
								className={`flex items-center justify-center transition-transform ${open ? "rotate-90" : ""}`}
							/>
							<span>{panel.title}</span>
						</button>

						<div className={`transition-all duration-200 ease-in-out ${open ? "max-h-48" : "max-h-0"}`}>
							<div className="border-t border-zinc-300 p-4">
								{panel.content}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
