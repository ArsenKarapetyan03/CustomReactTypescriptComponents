import { type RefObject, useEffect } from "react";

export function useClickOutside(ref: RefObject<HTMLElement | null>, cb: (e: MouseEvent) => void, parent?: string) {

	useEffect(() => {

		const element = parent ? document.querySelector(parent) as HTMLElement : document.body;

		if (!element) return;

		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				cb(e as MouseEvent);
			}

		}

		element.addEventListener("click", handleClick);
		return () => element.removeEventListener("click", handleClick);
	}, [ref, cb, parent]);
}