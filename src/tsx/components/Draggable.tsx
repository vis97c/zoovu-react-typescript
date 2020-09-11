/** @format */
import React, { useMemo } from "react";

export default function Draggable(props: { icon?: string }) {
	// react memo
	const symbol = useMemo(() => props.icon.split("-")[1], [props.icon]);

	return (
		<button
			className="c-avatar m__size-lg gm__grab"
			draggable="true"
			onDragStart={e => {
				e.dataTransfer.setData("text/plain", null);
			}}
			data-symbol={symbol}
		>
			<img
				src={`/images/${props.icon}.svg`}
				alt={`${props.icon} letter`}
				loading="lazy"
				className="m__bgColor-none"
			/>
		</button>
	);
}

Draggable.defaultProps = {
	icon: "zoovu-z",
};
