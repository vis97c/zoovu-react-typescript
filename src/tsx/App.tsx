/** @format*/

import React, { useState, useMemo, useEffect } from "react";
import Draggable from "_components/Draggable";
import Trigger from "_components/Trigger";

export default function App() {
	// react state
	const [playing, setPlaying] = useState(false); // false by default
	const [name, setName] = useState("");
	const [victory, setVictory] = useState(false);
	const [timeLeft, setTimeLeft] = useState(25); // seconds
	// react memo
	const capitalName = useMemo(() => capitalize(name), [name]);

	function start() {
		// star game if name available
		if (name) {
			setTimeLeft(25);
			setPlaying(true);
			setVictory(false);
			return;
		}
		return alert("Please provide a name before proceeding.");
	}

	function capitalize(value: string) {
		// capitalize first letter of a string
		return value.charAt(0).toUpperCase() + value.slice(1);
	}

	useEffect(() => {
		if (playing) {
			if (timeLeft > 0) {
				// active game
				setTimeout(() => {
					setTimeLeft(left => left - 1);
				}, 1000);
			} else {
				// game finished
				setPlaying(false);
				setTimeout(() => {
					alert("Time out, you've lost");
				}, 100);
			}
		}
		// return () => {};
	}, [playing, timeLeft]);

	return (
		<div id="appex">
			<div className="c-back" aria-hidden>
				<img
					src="/images/shapes.png"
					alt=""
					className="m__bgColor-none"
				/>
			</div>

			<div className="c-holder gm__txtAlign-center">
				{!playing && (
					<div className="c-flxInline m__flxColumn gu__flx-center">
						<div className="x-txt xm__txtAlign-center">
							<p>
								<b>Hello friend, tell me your name...</b>
							</p>
						</div>
						<input
							type="text"
							className="c-inTxt"
							placeholder="Your name here"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						{timeLeft == 25 && (
							<div className="c-flx m__flxRow gu__flx-center">
								<Trigger onClick={start} />
							</div>
						)}
						{timeLeft == 0 && (
							<div className="c-flx m__flxRow gu__flx-center">
								<p className="gm__txtColor-primary">
									<b>You ran out of time</b>
								</p>
								<Trigger onClick={start} msg="Start over" />
							</div>
						)}
						{timeLeft > 0 && victory && (
							<div className="c-flx m__flxColumn gu__flx-center">
								<div className="c-flx m__flxRow gu__flx-center">
									<p className="gm__txtColor-secondary">
										<b>Congratulations, you won!</b>
									</p>
									<Trigger onClick={start} msg="Play again" />
								</div>
								<p className="gm__txtSize-xs gm__txtColor-dark3">
									<b>Your score: {timeLeft}</b>
								</p>
							</div>
						)}
					</div>
				)}
				{playing && (
					<div className="c-flx m__flxColumn gu__flx-center gm__gapingY-100">
						<div className="c-flx m__flxColumn gu__flx-center-stretch gm__gapingY-30">
							<div className="c-flx m__flxColumn gu__flx-center-stretch">
								<div className="c-flx m__flxRow gu__flx-between-center">
									<p>
										<b>Good luck, {capitalName}!</b>
									</p>
									<p>
										<i className="far fa-clock c-icon m__size-20 gm__txtColor-secondary"></i>
										&nbsp;
										<b className="gm__txtColor-primary">
											Your score: {timeLeft} seconds
										</b>
									</p>
								</div>
								<div className="c-flx m__flxRow gu__flx-between-center">
									<p className="gm__txtSize-xs gm__txtColor-dark3">
										<b>Pick up the right cards</b>
									</p>
									<p className="gm__txtSize-xs gm__txtColor-dark3">
										<b>The faster the better!</b>
									</p>
								</div>
							</div>
							<div className="c-flxInline m__flxRow gu__flx-center">
								<div className="c-avatar m__size-lg gm__dropArea is__full">
									<Draggable icon="zoovu-o" />
								</div>
								<div className="c-avatar m__size-lg gm__dropArea is__full">
									<Draggable icon="zoovu-z" />
								</div>
								<div className="c-avatar m__size-lg gm__dropArea is__full">
									<Draggable icon="zoovu-v" />
								</div>
								<div className="c-avatar m__size-lg gm__dropArea is__full">
									<Draggable icon="zoovu-u" />
								</div>
								<div className="c-avatar m__size-lg gm__dropArea is__full">
									<Draggable icon="zoovu-o" />
								</div>
							</div>
						</div>

						<div className="c-flx m__flxColumn gu__flx-center-start">
							<p className="gm__txtSize-xs gm__txtColor-dark3">
								<b>
									...and drop them here to make the logo great
									again!
								</b>
							</p>
							<div className="c-flxInline m__flxRow gu__flx-center">
								<button className="c-avatar m__size-lg gm__dropArea"></button>
								<button className="c-avatar m__size-lg gm__dropArea"></button>
								<button className="c-avatar m__size-lg gm__dropArea"></button>
								<button className="c-avatar m__size-lg gm__dropArea"></button>
								<button className="c-avatar m__size-lg gm__dropArea"></button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
