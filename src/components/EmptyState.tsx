import type { HtmlHTMLAttributes } from "react";
import { cn } from "../lib/utils.ts";
import { FolderOpenDot, type LucideIcon } from "lucide-react";

interface EmptyStateProps extends HtmlHTMLAttributes<HTMLDivElement> {
	message?: string;
	icon?: LucideIcon;
}

export const EmptyState = (
	{
		message = "No data",
		icon: Icon = FolderOpenDot,
		className,
		...props
	}: EmptyStateProps) => {
	return (
		<div
			{...props}
			className={cn("flex flex-col items-center justify-center max-w-7xl", className)}
		>
			<Icon size={64} strokeWidth={1} />
			<span>{message}</span>
		</div>
	)
}