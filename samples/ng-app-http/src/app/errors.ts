export class RequestError extends Error {
  details: any;
  constructor(
    public status: number,
    public statusText: string,
    response?: any
  ) {
    super();
    this.name = RequestError.name;
    this.message = `Request failed: ${status} - ${statusText}`;
    this.details = response.error;
  }
}

export class CommunicationError extends Error {
  details: any;
  constructor(message, details = null) {
    super(message);
    this.name = CommunicationError.name;
    this.details = details;
  }
}
