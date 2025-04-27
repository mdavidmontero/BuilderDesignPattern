import { Request, Response, NextFunction } from 'express';
export const setDefaultValuesByType = (req: Request, res: Response, next: NextFunction) => {
  console.log('Antes de asignar valores por defecto:', req.body);

  const { type } = req.body;

  
  const defaultValues = {
    Email: {
      to: '',
      subject: '',
      body: '',
      cc: [],
      bcc: [],
      attachments: [],
      priority: 'media', 
    },
    SMS: {
      phoneNumber: '',
      message: '',
      senderId: 'defaultSender',  
      deliveryReportRequired: false, 
      scheduleTime: new Date(), 
    },
    PUSH: {
      deviceToken: '',
      title: '',
      message: '',
      imageUrl: ' ',    
      clickAction: ' ',  
      priority: 'normal', 
    },
    Whatsapp: {
      phoneNumber: '',
      message: '',
      mediaUrl: ' ',
      caption: ' ',
      interactiveButtons: [],
      language: 'es', // Idioma por defecto
    },
  };

  // Si el tipo está definido y existe en los valores por defecto
  if (type && defaultValues[type]) {
    const typeDefaults = defaultValues[type];

    console.log('Valores por defecto para el tipo', type, ':', typeDefaults);

    // Asignamos los valores por defecto en el cuerpo de la solicitud solo si están ausentes, nulos o vacíos
    Object.keys(typeDefaults).forEach((key) => {
      const isFieldEmpty = req.body[key] === undefined || req.body[key] === null || req.body[key] === '';

      // Si el campo está vacío o no existe, asignamos el valor por defecto
      if (isFieldEmpty) {
        console.log(`Asignando valor por defecto para: ${key}`);
        req.body[key] = typeDefaults[key];
      }
    });
  }

  console.log('Después de asignar valores por defecto:', req.body);

  // Continuamos con el siguiente middleware
  next();
};
