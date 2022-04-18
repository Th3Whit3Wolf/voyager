import "@testing-library/jest-dom";

// Polyfill "window.fetch" used in the React component.
import "whatwg-fetch";
import { server } from "../mocks/server";

// eslint-disable-next-line no-console
// Suppress error logs to keep our test logs clean (e.g. API error responses, etc)
beforeAll(() => {
	console.error = () => {};
});

// We start up a mock server at the start of the test run, shut it down when the run ends,
// and reset the request handlers after each individual test to clear out any custom
// handlers that may have been added for that test.

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
