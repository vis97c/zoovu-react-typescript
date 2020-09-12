/** @format */
/* globals*/
// Log message
console.log(
	"%c###%c Made with ❤ using React.js\n%c##%c  Developed & mantained by @vis97c\n%c#%c   Get in touch with me on Twitter or GitHub",
	"background:#f1c40f;color:transparent;padding:3px 0",
	"padding:3px 0",
	"background:#2980b9;color:transparent;padding:3px 0",
	"padding:3px 0",
	"background:#e74c3c;color:transparent;padding:3px 0",
	"padding:3px 0"
);

//main app styles
import "_scss/index.scss";

import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";

import App from "./App"; // eslint-disable-line no-unused-vars

ReactDOM.render(<App />, document.getElementById("root"));
