export class ApiError extends Error {
  apiStatusCode: number;

  constructor(name: string, message: string, apiStatusCode: number) {
    super(message);
    this.name = name;
    this.apiStatusCode = apiStatusCode;
  }
}
