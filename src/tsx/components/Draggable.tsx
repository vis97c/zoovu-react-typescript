/* @format **/
import React from "react";

export default function Draggable(props: {
	icon?: string;
}) {

	return (
        <button className="c-avatar m__size-lg gm__grab">
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
    icon: "zoovu-z"
}