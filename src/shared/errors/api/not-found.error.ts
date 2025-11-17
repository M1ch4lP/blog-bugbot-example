export class NotFoundApiError extends Error {
  apiStatusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.apiStatusCode = 404;
  }
}
