import { useState, useEffect, type ReactNode } from "react";
import { cn } from "../../lib/utils.ts";
import { X } from "lucide-react";

interface CustomModalProps {
	content: {
		contentTitle: string;
		contentBody: string | ReactNode;
	};
	modalOpen: boolean;
	setModalOpen: (open: boolean) => void;

	size?: "sm" | "md" | "lg";
	variant?: "confirm" | "alert";
	onClose?: () => void;
}

const SIZES = {
	sm: {
		contentTitle: "text-sm",
		contentBody: "text-sm",
		modal: "max-w-sm",
	},
	md: {
		contentTitle: "text-base",
		contentBody: "text-base",
		modal: "max-w-md",
	},
	lg: {
		contentTitle: "text-lg",
		contentBody: "text-lg",
		modal: "max-w-lg",
	},
};

export const CustomModal = (
	{
		modalOpen,
		setModalOpen,
		content,
		size = "md",
		variant = "confirm",
		onClose,
	}: CustomModalProps) => {
	const sizeStyles = SIZES[size];

	const [mounted, setMounted] = useState(modalOpen);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (modalOpen) {
			setMounted(true);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setVisible(true);
				});
			});
		} else {
			setVisible(false);

			const timer = setTimeout(() => {
				setMounted(false);
			}, 300);

			return () => clearTimeout(timer);
		}
	}, [modalOpen]);

	const handleClose = () => {
		setModalOpen(false);
		onClose?.();
	};

	if (!mounted) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				onClick={handleClose}
				className={cn(
					"absolute inset-0 bg-black/50 transition-opacity duration-300",
					visible ? "opacity-100" : "opacity-0"
				)}
			/>

			{/* Modal */}
			<div
				className={cn(
					"relative w-full rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-out",
					sizeStyles.modal,
					visible ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10"
				)}
			>
				{/* Close Button */}
				<button
					onClick={handleClose}
					className="absolute right-4 top-4 text-gray-500 transition hover:text-gray-900"
				>
					<X />
				</button>

				<div className="pr-6">
					<h2 className={cn(
						"font-semibold",
						SIZES[size].contentTitle,
						variant === "alert" && "text-red-600!"
					)}
					>
						{content.contentTitle}
					</h2>
					<div className={cn("mt-3 text-gray-600", sizeStyles.contentBody)}>
						{content.contentBody}
					</div>
				</div>
			</div>
		</div>
	);
};
