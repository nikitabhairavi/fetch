export class ApiError extends Error {
  status: number;
  error: unknown;
  data: [] | {};

  constructor(data: {} | [], status: number, message: string) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
