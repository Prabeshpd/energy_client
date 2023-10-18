"use client";

import { Formik } from "formik";
import ClipLoader from "react-spinners/ClipLoader";

import FileUploader from "@/components/FileUploader/FileUploader";
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage";
import { RegisterPayload } from "@/types/auth";

import RegistrationSchema from "./schema";

interface InjectedProps {
  handleFormSubmit: (payload: RegisterPayload) => void;
}

export function RegistrationForm(props: InjectedProps) {
  const { uploadFile, imageUrl, isUploading } = useFirebaseStorage();

  const handleFileChange = async (file: File) => {
    await uploadFile(file);
  };

  const { handleFormSubmit } = props;
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: ""
      }}
      validationSchema={RegistrationSchema}
      onSubmit={async (values, { resetForm }) => {
        const payload = {
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
          imageUrl
        };

        resetForm({ values: { name: "", email: "", password: "" } });
        await handleFormSubmit(payload);
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
                {errors.password && touched.password && <p className="form__error">{errors.password}</p>}
              </div>

              <div className="form__element sm:col-span-4 form__upload">
                <div>
                  {(imageUrl && <img className="rounded-full w-16 h-16" src={imageUrl} alt="image description" />) || (
                    <svg fill="none" viewBox="0 0 24 24" height="4em" width="4em" {...props}>
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                        clipRule="evenodd"
                      />
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <FileUploader isLoading={isUploading} handleChange={handleFileChange} />
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
