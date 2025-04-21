export interface INotificationBuilder<T> {
    reset(): void;
    build(): T;
  }