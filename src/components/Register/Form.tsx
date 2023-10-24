'use client';

import { Formik } from 'formik';
import ClipLoader from 'react-spinners/ClipLoader';

import { RegisterPayload } from '@/types/auth';

import RegistrationSchema from './schema';

interface InjectedProps {
  registerUser: (payload: RegisterPayload) => void;
}

export function RegistrationForm(props: InjectedProps) {
  const { registerUser } = props;
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={RegistrationSchema}
      onSubmit={async (values, { resetForm }) => {
        const payload = {
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        };

        resetForm({ values: { name: '', email: '', password: '' } });
        await registerUser(payload);
      }}
    >
      {({ handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="form__body">
              <div className="form__element sm:col-span-4">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    data-test-id="register-form-name"
                    type="text"
                    className="form__input"
                    placeholder="Name"
                    name="name"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.name && touched.name && <p className="form__error">{errors.name}</p>}
              </div>
              <div className="form__element sm:col-span-4">
                <label className="form__label" htmlFor="email">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    data-test-id="register-form-email"
                    type="email"
                    className="form__input"
                    placeholder="email"
                    name="email"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email && <p className="form__error">{errors.email}</p>}
              </div>
              <div className="form__element  sm:col-span-4">
                <label className="form__label" htmlFor="password">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    data-test-id="register-form-password"
                    type="password"
                    className="form__input"
                    placeholder="password"
                    name="password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.password && touched.password && (
                  <p className="form__error">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="form__footer">
              {(!isSubmitting && (
                <button
                  type="submit"
                  name="submit"
                  data-test-id="register-form-submit"
                  disabled={isSubmitting}
                  value="Submit"
                  className="button button--primary"
                >
                  Register
                </button>
              )) || <ClipLoader aria-label="application-loader" />}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default RegistrationForm;
