import { useState } from "react";

type DikCounterProps = {
	initialValue?: number;
	isBig?: boolean;
};

export function DikCounter({ initialValue = 0, isBig }: DikCounterProps) {
	const [count, setCount] = useState(initialValue);

	return (
		<button
			onClick={() => setCount(count + 1)}
			style={{ fontSize: isBig ? "5rem" : "1.5rem" }}
		>
			🍆 count is {count}
		</button>
	);
}
