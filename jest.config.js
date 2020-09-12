/** @format */
module.exports = {
	verbose: true,
	moduleFileExtensions: ["js", "ts", "json", "tsx"],
	moduleNameMapper: {
		"^_components/(.*)": "<rootDir>/src/tsx/components/$1",
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	collectCoverage: true,
	collectCoverageFrom: ["src/tsx/{*,components/*}.{ts,tsx}", "!**/node_modules/**"],
	coverageReporters: ["html", "text-summary"],
};
