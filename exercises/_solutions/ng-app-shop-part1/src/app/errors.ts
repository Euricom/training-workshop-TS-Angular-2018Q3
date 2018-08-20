export class RequestError extends Error {
  details: any;
  constructor(
    public status: number,
    public statusText: string,
    response?: any,
  ) {
    super();
    this.name = RequestError.name;
    this.message = `${statusText} [${status}]`;
    this.details = response.error;
  }
}

export class CommunicationError extends Error {
  constructor(message: string, public details = null) {
    super(message);
    this.name = CommunicationError.name;
  }
}
