import { INotificationBuilder } from "../interfaces/INotificationBuilder";

export class NotificationDirector<T, B extends INotificationBuilder<T>> {
  private builder!: B;

  setBuilder(builder: B) {
    this.builder = builder;
  }

  construct(configure: (builder: B) => void): T {
    this.builder.reset();
    configure(this.builder);
    return this.builder.build();
  }
}
