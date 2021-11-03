export type Email = string;
export type Label = string;

export interface Mail {
  snippet: string;
  labelIds: Label[];
  from: Email;
  subject: string;
  to: Email;
  date: Date;
}
