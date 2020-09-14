/** @format*/

import React, { useState, useMemo, useEffect, Key } from "react";
import Draggable from "_components/Draggable";
import Trigger from "_components/Trigger";

let dragged,
	playing = false; // functions on react are unaware of reactivity

export default function App() {
	// react state
	const [landing, setLanding] = useState(true); // true by default
	const [name, setName] = useState("");
	const [submited, setSubmited] = useState(false);
	const [full, setFull] = useState(0);
	const [timeLeft, setTimeLeft] = useState(null); // seconds
	const [extraTime, setExtraTime] = useState(false);
	// react memo
	const capitalName = useMemo(() => {
		return name.charAt(0).toUpperCase() + name.slice(1);
	}, [name]);

	function toGame() {
		if (name) {
			setSubmited(true);
			setTimeLeft(null);
			setLanding(false);
			setTimeout(() => {
				//wait for mount
				setListeners();
			}, 100);
			return;
		}
		return alert("Please provide a name before proceeding.");
	}

	function start() {
		// star game if name available
		if (!playing) {
			playing = true;
			setFull(0);
			setTimeLeft(25); //25 by default
		}
		return;
	}

	function keyUp(e: KeyboardEvent) {
		// console.log("enter");
		if (e.key == "Enter" && !playing) {
			//launch game on enter press
			toGame();
		}
	}

	function setListeners(set = true) {
		let status = (set ? "add" : "remove") + "EventListener";
		setTimeout(() => {
			//wait for mount
			if (isAdvancedApi()) {
				// Add our drag & drop listeners
				let areas = Array.from(document.getElementsByClassName("gm__dropArea"));
				areas.forEach(area => {
					area[status]("dragover", prevent, false);
					area[status]("dragstart", isStart, false);
					area[status]("dragleave", isOverToggle, false);
					area[status]("dragenter", isOverToggle, false);
					area[status]("drop", isDrop, false);
				});
			}
		}, 100);
	}
	function prevent(e: Event) {
		// just a prevent
		e.preventDefault();
		e.stopPropagation();
	}
	function isStart(e: Event) {
		//drag start
		if (!playing) {
			// start game
			start();
		}
		dragged = e.target;
	}
	function isOverToggle(e: Event) {
		//cursor is over
		prevent(e);
		let target = e.target as HTMLElement;
		target.classList.toggle("is__over");
	}
	function isDrop(e: Event) {
		//file droped
		prevent(e);
		isOverToggle(e);
		let target = e.target as HTMLElement;
		if (target.classList.contains("gm__dropArea") && !target.classList.contains("is__full")) {
			// remove from old element
			let old = dragged.parentNode;
			old.removeChild(dragged);
			old.classList.remove("is__full");
			// add to new element
			target.appendChild(dragged);
			target.classList.add("is__full");
			if (target.dataset.symbol && target.dataset.symbol == dragged.dataset.symbol) {
				// is correct
				target.setAttribute("disabled", "");
				setFull(oldFull => oldFull + 1);
				if (old.dataset.base) {
					old.setAttribute("disabled", "");
				}
			} else {
				// is incorrect, add more time
				if (!target.dataset.base) {
					setExtraTime(true);
				}
			}
		}
	}
	function isAdvancedApi() {
		// check support for drag and drop
		var div = document.createElement("div");
		return "draggable" in div || ("ondragstart" in div && "ondrop" in div);
	}

	useEffect(() => {
		// this runs on first render
		setTimeout(function() {
			//wait for mount
			document.addEventListener("keyup", keyUp, false);
		}, 100);
		return () => {
			// clear listeners
			setListeners(false);
			document.removeEventListener("keyup", keyUp, false);
		};
	});

	useEffect(() => {
		// this runs on updated state
		setTimeout(() => {
			if (playing && full < 5) {
				if (timeLeft > 0) {
					// active game
					if (extraTime) {
						setExtraTime(false);
						setTimeLeft(left => left + 9);
					} else {
						setTimeLeft(left => left - 1);
					}
				} else {
					// game finished
					playing = false;
					setLanding(true);
					setTimeout(() => {
						//wait for mount, view change
						alert("Time out, you've lost");
					}, 100);
					setTimeout(() => {
						//restart automatically after 10s
						toGame();
					}, 10000);
				}
			}
		}, 1000);
	}, [timeLeft]);

	useEffect(() => {
		// this runs on updated state
		if (full == 5 && playing) {
			// You won
			playing = false;
			setLanding(true);
			setListeners(false);
			setTimeout(() => {
				//restart automatically after 10s
				toGame();
			}, 10000);
		}
	}, [full]);

	return (
		<div id="appex">
			<div className="c-back" aria-hidden>
				<img src="/images/shapes.png" alt="" className="m__bgColor-none" />
			</div>

			<div className="c-holder gm__txtAlign-center gm__hidden:md-inv">
				{landing && (
					<div id="login" className="c-flxInline m__flxColumn gu__flx-center">
						{/* landing */}
						{!submited && (
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
							</div>
						)}
						{/* score */}
						{(timeLeft == 25 || timeLeft == null) && (
							<div className="c-flx m__flxRow gu__flx-center">
								<Trigger onClick={toGame} />
							</div>
						)}
						{timeLeft <= 0 && timeLeft != null && (
							<div className="c-flx m__flxColumn gu__flx-center">
								<div className="c-flx m__flxRow gu__flx-center">
									<p className="gm__txtColor-primary">
										<b>You ran out of time</b>
									</p>
									<Trigger onClick={toGame} msg="Start over" />
								</div>
								<p className="gm__txtSize-xs gm__txtColor-dark4">Restarting in a few seconds...</p>
							</div>
						)}
						{timeLeft > 0 && full == 5 && (
							<div className="c-flx m__flxColumn gu__flx-center">
								<div className="c-flx m__flxRow gu__flx-center">
									<p className="gm__txtColor-secondary">
										<b>Congratulations, you won!</b>
									</p>
									<Trigger onClick={toGame} msg="Play again" />
								</div>
								<p className="gm__txtSize-xs gm__txtColor-dark4">
									<b className="gm__txtColor-dark9">Your score: {timeLeft}</b>, restarting in a few
									seconds...
								</p>
							</div>
						)}
					</div>
				)}
				{!landing && (
					<div id="playground" className="c-flx m__flxColumn gu__flx-center gm__gapingY-100">
						<div className="c-flx m__flxColumn gu__flx-center-stretch gm__gapingY-30">
							<div className="c-flx m__flxColumn gu__flx-center-stretch">
								<div className="c-flx m__flxRow gu__flx-between-center">
									<p>
										<b>Good luck, {capitalName}!</b>
									</p>
									<p>
										<i className="far fa-clock c-icon m__size-20 gm__txtColor-secondary"></i>
										&nbsp;
										<b className="gm__txtColor-primary">Your score: {timeLeft || 25} seconds</b>
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
								<div className="c-avatar m__size-lg gm__dropArea is__full" data-base="o">
									<Draggable icon="zoovu-o" />
								</div>
								<div className="c-avatar m__size-lg gm__dropArea is__full" data-base="z">
									<Draggable icon="zoovu-z" />
								</div>
								<div className="c-avatar m__size-lg gm__dropArea is__full" data-base="v">
									<Draggable icon="zoovu-v" />
								</div>
								<div className="c-avatar m__size-lg gm__dropArea is__full" data-base="u">
									<Draggable icon="zoovu-u" />
								</div>
								<div className="c-avatar m__size-lg gm__dropArea is__full" data-base="o">
									<Draggable icon="zoovu-o" />
								</div>
							</div>
						</div>

						<div className="c-flx m__flxColumn gu__flx-center-start">
							<p className="gm__txtSize-xs gm__txtColor-dark3">
								<b>...and drop them here to make the logo great again!</b>
							</p>
							<div className="c-flxInline m__flxRow gu__flx-center">
								<button className="c-avatar m__size-lg gm__dropArea" data-symbol="z"></button>
								<button className="c-avatar m__size-lg gm__dropArea" data-symbol="o"></button>
								<button className="c-avatar m__size-lg gm__dropArea" data-symbol="o"></button>
								<button className="c-avatar m__size-lg gm__dropArea" data-symbol="v"></button>
								<button className="c-avatar m__size-lg gm__dropArea" data-symbol="u"></button>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="c-holder gm__txtAlign-center gm__hidden:md">
				<div className="c-flxInline m__flxColumn gu__flx-center">
					<div className="x-txt xm__txtAlign-center">
						<p>
							<b>Your device is not compatible with this game</b>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
