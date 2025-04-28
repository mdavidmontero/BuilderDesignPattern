import { Request, Response, NextFunction } from "express";
export const setDefaultValuesByType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type } = req.body;

  const defaultValues = {
    Email: {
      to: "",
      subject: "",
      body: "",
      cc: [],
      bcc: [],
      attachments: [],
      priority: "media",
    },
    SMS: {
      phoneNumber: "",
      message: "",
      senderId: "defaultSender",
      deliveryReportRequired: false,
      scheduleTime: new Date(),
    },
    PUSH: {
      deviceToken: "",
      title: "",
      message: "",
      imageUrl: " ",
      clickAction: " ",
      priority: "normal",
    },
    Whatsapp: {
      phoneNumber: "",
      message: "",
      mediaUrl: " ",
      caption: " ",
      interactiveButtons: [],
      language: "es",
    },
  };

  if (type && defaultValues[type]) {
    const typeDefaults = defaultValues[type];

    Object.keys(typeDefaults).forEach((key) => {
      const isFieldEmpty =
        req.body[key] === undefined ||
        req.body[key] === null ||
        req.body[key] === "";

      if (isFieldEmpty) {
        req.body[key] = typeDefaults[key];
      }
    });
  }
  next();
};
