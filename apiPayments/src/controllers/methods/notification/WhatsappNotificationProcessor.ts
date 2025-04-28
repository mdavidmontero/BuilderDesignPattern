import { NotificationDirector } from "../../../builders/directors/NotificationDirector";
import { IWhatsappBuilder } from "../../../builders/Builder/IWhatsappBuilder";
import { WhatsappBuilder } from "../../../builders/Concrete Builder/WhatsAppBuilder";
import { WhatsappNotification } from "../../../builders/Productos/WhatsAppNotification";
import { INotificationProcessor } from "../../../services/notifications";

export class WhatsappProcessor implements INotificationProcessor {
  process(message: any): string {
    const builder = new WhatsappBuilder();
    const director = new NotificationDirector<WhatsappNotification, IWhatsappBuilder>();
    director.setBuilder(builder);

    const wa = director.construct(b =>
      b.setPhoneNumber(message.phoneNumber)
        .setMessage(message.message)
        .setMediaUrl(message.mediaUrl || "")
        .setCaption(message.caption || "")
        .setInteractiveButtons(message.interactiveButtons || [])
        .setLanguage(message.language || "es")
    );

    return wa.send();
  }
}
