export class TrackClick {
  static type = "[Tracking] Click"; // Loona type issue
  type = TrackClick.type; // Loona type issue

  constructor(public event: string, public value: string) {}
}
