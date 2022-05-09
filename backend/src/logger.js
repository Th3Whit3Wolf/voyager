import pino from "pino";
import expressPino from "express-pino-logger";

const loggerOptions = pino({
	level: "info",
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true
		}
	}
});

export default expressPino({
	logger: loggerOptions
});
