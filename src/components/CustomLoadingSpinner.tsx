interface CustomLoadingSpinnerProps {
	description?: string;
	variant?: "solid" | "dashed" | "dots";
	size?: "sm" | "md" | "lg";
	duration?: number | string;
}

const SIZES = {
	sm: {
		spinner: "size-6",
		dot: "size-2",
		borderSpinner: "h-6 w-6 border-2",
		text: "text-sm",
		gap: "gap-2",
	},
	md: {
		spinner: "size-10",
		dot: "size-3",
		borderSpinner: "h-10 w-10 border-3",
		text: "text-base",
		gap: "gap-3",
	},
	lg: {
		spinner: "size-16",
		dot: "size-5",
		borderSpinner: "h-14 w-14 border-5",
		text: "text-lg",
		gap: "gap-4",
	},
};

export const CustomLoadingSpinner = (
	{
		description,
		variant = "dots",
		size = "md",
		duration = "infinite",
	}: CustomLoadingSpinnerProps) => {

	return (
		<div className={`flex flex-col items-center justify-center ${SIZES[size].gap}`}>
			{variant === "dots" ? (
				<div
					className={`relative animate-spin ${SIZES[size].spinner}`}
					style={{animationIterationCount: duration}}
				>
					<div className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-blue-400 ${SIZES[size].dot}`}/>
					<div className={`absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-blue-500 ${SIZES[size].dot}`}/>
					<div className={`absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-blue-200 ${SIZES[size].dot}`}/>
					<div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-blue-400 ${SIZES[size].dot}`}/>
				</div>
			) : (
				<div
					className={`
							${SIZES[size].borderSpinner} 
							${variant === "dashed" ? "border-dashed" : "border-solid"} 
							animate-spin rounded-full border-transparent border-t-blue-500 border-r-blue-500
						`}
					style={{animationIterationCount: duration}}
				/>
			)}

			{description && (
				<p className={`text-blue-500 ${SIZES[size].text}`}>
					{description}
				</p>
			)}
		</div>
	);
};
