/* @format **/
import React from "react";

export default function Trigger(props: {
	msg?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {

	return (
        <button className="c-btn" onClick={props.onClick}>
            <span className="gm__txtSize-sm">
                {props.msg}
            </span>
            <i className="fas fa-long-arrow-alt-right c-icon"></i>
        </button>
	);
}

Trigger.defaultProps = {
    msg: "Let's go"
}