const baseURL =
	process.env.NODE_ENV == "production"
		? "https://bsdi1-voyager-backend.herokuapp.com/api/v1"
		: "http://localhost:8081/api/v1";

const queryBuilderThrow = (fnName, errorKind, expected, received) => {
	throw `\n[API QueryBuilder::${fnName}] Error(${errorKind}):\nExpected: ${expected}.\nReceived: ${received}\n`;
};

class APIQueryBuilder {
	#queryParameters = [];

	constructor(endpoint, validQueryParameters) {
		this.endpoint = endpoint;
		this.validQueryParameters = validQueryParameters;
	}

	addQueryParameter(parameter) {
		if (this.validQueryParameters[parameter.name] !== undefined) {
			switch (this.validQueryParameters[parameter.name].type) {
				case "boolean":
					if (typeof parameter.value === "boolean") {
						this.#queryParameters.push(`${parameter.name}=${parameter.value}`);
						return this;
					} else {
						return queryBuilderThrow(
							"addQueryParameter",
							"Invalid Parameter Type",
							"boolean",
							parameter.value
						);
					}
				case "number":
					if (typeof parameter.value === "number") {
						this.#queryParameters.push(`${parameter.name}=${parameter.value}`);
						return this;
					} else {
						return queryBuilderThrow(
							"addQueryParameter",
							"Invalid Parameter Type",
							"number",
							parameter.value
						);
					}
				case "string":
					if (typeof parameter.value === "string") {
						this.#queryParameters.push(`${parameter.name}=${parameter.value}`);
						return this;
					} else {
						return queryBuilderThrow(
							"addQueryParameter",
							"Invalid Parameter Type",
							"string",
							parameter.value
						);
					}
				case "enum":
					try {
						if (
							this.validQueryParameters[parameter.name].variants.includes(
								parameter.value
							)
						) {
							this.#queryParameters.push(
								`${parameter.name}=${parameter.value}`
							);
							return this;
						} else {
							return queryBuilderThrow(
								"addQueryParameter",
								"Invalid Parameter Type",
								`One of ${this.validQueryParameters[
									parameter.name
								].variants.join(",")}`,
								parameter.value
							);
						}
					} catch (_) {
						return queryBuilderThrow(
							"addQueryParameter",
							"Malformed validQueryParameters for enum",
							`{
                                type: "enum",
                                variants: [
                                    "variant1",
                                    "variant2"
                                ],
                            }`,
							this.validQueryParameters[parameter.name]
						);
					}
				case "Date":
					if (parameter.value instanceof Date && !isNaN(parameter.value)) {
						this.#queryParameters.push(
							`${parameter.name}=${JSON.stringify(parameter.value)}`
						);
						return this;
					} else {
						return queryBuilderThrow(
							"addQueryParameter",
							"Invalid Parameter Type",
							"Date",
							parameter.value
						);
					}
				default:
					return queryBuilderThrow(
						"addQueryParameter",
						"Invalid Parameter Type",
						"One of number, string, enum, or Date",
						this.validQueryParameters[parameter.name].type
					);
			}
		} else {
			queryBuilderThrow(
				"addQueryParameter",
				"Invalid Parameter Name",
				`One of ${Object.keys(this.validQueryParameters).join(",")}`,
				parameter.name
			);
		}
	}

	toURL() {
		return `${baseURL}/${this.endpoint}${
			this.#queryParameters.length > 0
				? "?" + [...this.#queryParameters].join("&")
				: ""
		}`;
	}

	fetchData() {
		return fetch(this.toURL(), {
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
}
export { APIQueryBuilder };
