import { Formik, Form, Field, ErrorMessage } from 'formik';
import st from './signIn.module.scss';

const initialValues = {
  email: '',
  password: '',
};

export default function SignIn() {
  return (
    <div className={st.modalWindow}>
      <div className={st.title}>Sign In</div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          const { email, password } = values;

          if (email === '') {
            errors.email = 'Email is required!';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address!';
          }

          if (password === '') {
            errors.password = 'Password is required!';
          } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long!';
          }

          return errors;
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ errors }) => (
          <Form className={st.form}>
            <Field type="email" name="email" />
            <div>
              {errors.email ? (
                <ErrorMessage name="email" component="div" />
              ) : (
                <p>Type any valid email</p>
              )}
            </div>
            <Field type="password" name="password" />
            <div>
              {errors.password ? (
                <ErrorMessage name="password" component="div" />
              ) : (
                <p>Type any valid password</p>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
