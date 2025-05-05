import { EmailNotification } from "../Productos/EmailNotification";


export class EmailPrototypeRegistry {
  private prototypes: Record<string, EmailNotification> = {};

  register(key: string, prototype: EmailNotification): void {
    this.prototypes[key] = prototype;
  }

  get(key: string): EmailNotification | null {
    const prototype = this.prototypes[key];
    return prototype ? prototype.clone() : null;
  }
}
