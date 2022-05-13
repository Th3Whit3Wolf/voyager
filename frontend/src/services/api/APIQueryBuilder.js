const baseURL =
	process.env.NODE_ENV == "production"
		? "https://bsdi1-voyager-backend.herokuapp.com/api/v1"
		: "http://localhost:8081/api/v1";

const queryBuilderThrow = (fnName, errorKind, expected, received) => {
	throw `\n[API QueryBuilder::${fnName}] Error(${errorKind}):\nExpected: ${expected}.\nReceived: ${received}\n`;
};

const jsonHeaders = new Headers();

jsonHeaders.append("Content-Type", "application/json");
class APIQueryBuilder {
	#queryParameters = [];
	#id;
	#limit;
	#page;

	constructor(endpoint, validQueryParameters) {
		this.endpoint = endpoint;
		this.validQueryParameters = validQueryParameters;
	}

	id = num => {
		if (typeof num === "number") {
			this.#id = num;
		} else {
			return queryBuilderThrow("id", "Invalid Parameter Type", "number", num);
		}
	};

	limit = num => {
		if (typeof num === "number") {
			this.#limit = num;
		} else {
			return queryBuilderThrow(
				"limit",
				"Invalid Parameter Type",
				"number",
				num
			);
		}
	};

	page = num => {
		if (typeof num === "number") {
			this.#page = num;
		} else {
			return queryBuilderThrow("page", "Invalid Parameter Type", "number", num);
		}
	};

	addQueryParameter = parameter => {
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
	};

	toURL = () => {
		const queryParams = [...this.#queryParameters];
		if (this.#id !== undefined) {
			queryParams.unshift(`id=${this.#id}`);
		}
		if (this.#page !== undefined) {
			queryParams.push(`page=${this.#page}`);
		}
		if (this.#limit !== undefined) {
			queryParams.push(`limit=${this.#limit}`);
		}
		return `${baseURL}/${this.endpoint}${
			queryParams.length > 0 ? `?${queryParams.join("&")}` : ""
		}`;
	};

	baseURL = () => {
		return `${baseURL}/${this.endpoint}`;
	};

	create = async data => {
		const body = JSON.stringify(data);
		return fetch(this.toURL(), {
			method: "POST",
			mode: "cors",
			headers: jsonHeaders,
			body
		});
	};

	delete = async () => {
		if (this.#id !== undefined) {
			return fetch(`${this.baseURL()}/${this.#id}`, {
				method: "DELETE",
				mode: "cors",
				headers: {}
			});
		} else {
			queryBuilderThrow(
				"delete",
				"method id never called",
				".id(num)\n.delete()",
				".delete()"
			);
		}
	};

	get = () => {
		console.log(this.toURL());
		return fetch(this.toURL(), {
			method: "GET",
			mode: "cors",
			headers: {}
		});
	};

	update = async data => {
		if (this.#id !== undefined) {
			const body = JSON.stringify(data);
			return fetch(`${this.baseURL()}/${this.#id}`, {
				method: "PUT",
				mode: "cors",
				headers: jsonHeaders,
				body
			});
		} else {
			queryBuilderThrow(
				"update",
				"method id never called",
				".id(num)\n.update(data)",
				".update(data)"
			);
		}
	};
}
export default APIQueryBuilder;
