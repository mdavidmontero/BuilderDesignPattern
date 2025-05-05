import { NotificationDirector } from "../../../builders/directors/NotificationDirector";
import { EmailNotification } from "../../../builders/Productos/EmailNotification";
import { INotificationProcessor } from "../../../services/notifications";
import { IEmailBuilder } from "../../../builders/Builder/IEmailBuilder";
import { EmailBuilder } from "../../../builders/Concrete Builder/EmailBuilder";
import { EmailPrototypeRegistry } from "../../../builders/Prototypes/EmailPrototypeRegistry";

export class EmailProcessor implements INotificationProcessor {
  private prototypeRegistry = new EmailPrototypeRegistry();

  constructor() {
    
    const builder = new EmailBuilder();
    const director = new NotificationDirector<EmailNotification, IEmailBuilder>();
    const baseTemplate = director.construct((b) =>
      b
        .setSubject("Confirmación de Pago")
        .setBody("Gracias por su pago. (Plantilla base)")
        .setCc([])
        .setBcc([])
        .setAttachments([])
        .setPriority("media")
    );
    this.prototypeRegistry.register("pagoConfirmado", baseTemplate);
  }


  process(message: any): string {
    
    const cloned = this.prototypeRegistry.get("pagoConfirmado");
    if (cloned) {
      cloned.to = message.to;
      cloned.subject = message.subject || cloned.subject;
      cloned.body = message.body || cloned.body;
      console.log("Correo procesado: ", cloned); 
      return cloned.send();


    }
    
    
    const builder = new EmailBuilder();
    const director = new NotificationDirector<
      EmailNotification,
      IEmailBuilder
    >();

    director.setBuilder(builder);

    const email = director.construct((b) =>
      b
        .setTo(message.to)
        .setSubject(message.subject)
        .setBody(message.body)
        .setCc(message.cc || [])
        .setBcc(message.bcc || [])
        .setAttachments(message.attachments || [])
        .setPriority(message.priority || "normal")
    );

    return email.send();
  }
}
