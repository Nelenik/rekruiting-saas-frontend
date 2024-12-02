export class AirtableError extends Error {
  constructor(public type: string, public message: string) {
    super(message);
    this.name = "AirtableError";
  }
}
