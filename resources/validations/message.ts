import * as Yup from 'yup';

export const messageValidationSchema = Yup.object().shape({
  text: Yup.string().required('Message is required'),
  senderId: Yup.string().required('Sender ID is required'),
  chatId: Yup.string().required('Chat ID is required'),
});
