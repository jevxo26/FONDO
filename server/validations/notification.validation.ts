import * as yup from "yup";

export const updateNotificationSchema = yup.object({
  pushNotification: yup.boolean().optional(),
  emailNotification: yup.boolean().optional(),
  smsNotification: yup.boolean().optional(),
  orderNotification: yup.boolean().optional(),
  paymentNotification: yup.boolean().optional(),
  promotionNotification: yup.boolean().optional(),
  chatNotification: yup.boolean().optional(),
  marketingNotification: yup.boolean().optional(),
  systemNotification: yup.boolean().optional(),
});
