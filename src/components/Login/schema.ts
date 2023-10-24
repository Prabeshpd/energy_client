import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').trim().lowercase().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default loginSchema;
