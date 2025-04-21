import { NotificationDirector } from "../../../builders/directors/NotificationDirector";
import { PushBuilder } from "../../../builders/push/PushBuilder";
import { PushNotification } from "../../../builders/push/PushNotification";
import { IPushBuilder } from "../../../builders/push/IPushBuilder";
import { INotificationProcessor } from "../../../services/notifications";

export class PushProcessor implements INotificationProcessor {
  process(message: any): string {
    const builder = new PushBuilder();
    const director = new NotificationDirector<PushNotification, IPushBuilder>();
    director.setBuilder(builder);

    const push = director.construct(b =>
      b.setDeviceToken(message.deviceToken)
        .setTitle(message.title)
        .setMessage(message.message)
        .setImageUrl(message.imageUrl || "")
        .setClickAction(message.clickAction || "")
        .setPriority(message.priority || "normal")
    );

    return push.send();
  }
}
