import { ApiError } from "./api.error";

export class NotFoundApiError extends ApiError {
  constructor(message: string) {
    super("NotFoundError", message, 404);
  }
}
