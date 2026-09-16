import { type InputHTMLAttributes, type ReactNode, type SubmitEvent, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils.ts";
import { CustomButton } from "./CustomButton.tsx";

type Size = "sm" | "md" | "lg";

interface Field {
	name: string;
	label: string;
	props: InputHTMLAttributes<HTMLInputElement>
	validate?: (value: string) => string | undefined;
	icon?: LucideIcon;
}

interface CustomFormProps {
	title: string;
	description?: string;
	fields: Field[];
	size?: Size;
	className?: string;
	child?: ReactNode;
	onSubmit: (formData: FormData) => void;
}

const sizeStyles = {
	sm: "h-9 px-3 text-sm",
	md: "h-10 px-3 text-base",
	lg: "h-12 px-4 text-lg",
};

export const CustomForm = (
	{
		title,
		description,
		fields,
		size = "md",
		className,
		child,
		onSubmit,
	}: CustomFormProps) => {

	const [errors, setErrors] = useState<Record<string, string>>({});

	const isValid = (formData: FormData) => {
		const newErrors: Record<string, string> = {};

		fields.forEach((field) => {
			if (field.validate) {
				const value = (formData.get(field.name) as string) || "";
				const errorMessage = field.validate(value);

				if (errorMessage) {
					newErrors[field.name] = errorMessage;
				}
			}
		})

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	}

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		if (isValid(formData)) {
			onSubmit(formData);
			event.target.reset();
		}
	};

	const handleReset = () => {
		setErrors({});
	};

	const handleInputChange = (fieldName: string, value: string) => {
		const field = fields.find(f => f.name === fieldName);

			setErrors(prevState => {
				const updatedErrors = {...prevState}

				if (field?.validate) {
					const errorMessage = field.validate(value)

					if (errorMessage) {
						updatedErrors[field.name] = errorMessage;
					} else {
						delete updatedErrors[field.name];
					}
				}
				return updatedErrors;
			});

	}

	return (
		<form
			onSubmit={handleSubmit}
			onReset={handleReset}
			className={cn(
				"max-w-1/2 space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm",
				className
			)}
		>
			{/* Form heading */}
			<div className="space-y-1">
				<h2 className="text-lg font-semibold text-zinc-950">
					{title}
				</h2>
				{description && (
					<p className="text-sm text-zinc-500">
						{description}
					</p>
				)}
			</div>

			{/* Fields */}
			<div className="space-y-4">
				{fields.map((field) => {
					const Icon = field.icon;

					return (
						<div
							key={field.name}
							className="space-y-2"
						>
							<label
								htmlFor={field.name}
								className="block text-sm font-medium text-zinc-900"
							>
								{field.label}
							</label>

							<div className="relative">
								{Icon && (<Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"/>)}

								<input
									{...field.props}
									id={field.name}
									name={field.name}
									onChange={(e) => handleInputChange(field.name, e.target.value)}
									type={field.props.type ?? "text"}
									placeholder={field.props.placeholder}
									disabled={field.props.disabled}
									className={cn(
										"w-full rounded-md border bg-transparent transition-colors placeholder:text-zinc-400",
										sizeStyles[size],
										Icon ? "pl-8" : "",
										errors[field.name] && "border-red-400",
									)}
								/>
							</div>
							{errors[field.name] && (
								<p className={"text-red-600"}>{errors[field.name]}</p>
							)}
						</div>
					);
				})}
			</div>

			{/* Custom content */}
			{child}

			<div className={"flex justify-center gap-2"}>
				<CustomButton type="reset">Reset</CustomButton>
				<CustomButton
					type="submit"
					variant={"primary"}
					animation={true}
					className={"bg-zinc-700"}
				>
					Submit
				</CustomButton>
			</div>
		</form>
	);
}
