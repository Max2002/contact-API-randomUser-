import { Formik, Form } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { validationEmail, validationPassword } from '../../utils/validation';
import st from './styles.module.scss';
import { Field, Button } from '../../components';
import {
  CloseSvg,
  ManIconSvg,
  HidePassSvg,
  PasswordSvg,
  VisiblePassSvg,
} from '../../assets/icons';
import { getMyProfile } from '../../redux/actionCreator/getMyProfile';

const initialValues = {
  email: '',
  password: '',
};

export default function SignIn({ handleSignIn }) {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const dispatch = useDispatch();
  const handleVisiblePass = () => setIsVisiblePass(!isVisiblePass);

  const validationForm = (values) => {
    const errors = {};
    const { email, password } = values;

    if (email === '') {
      errors.email = 'Email is required!';
    } else if (!validationEmail(email)) {
      errors.email = 'Invalid email address!';
    }

    if (password === '') {
      errors.password = 'Password is required!';
    } else if (!validationPassword(password)) {
      errors.password = 'Password incorrect, please change password!';
    }

    return errors;
  };

  const onSubmitForm = (data) => {
    localStorage.setItem(data.email, JSON.stringify(data));
    localStorage.setItem('auth', data.email);
    dispatch(getMyProfile(data.email));
    handleSignIn();
  };

  const passIcon = isVisiblePass ? (
    <VisiblePassSvg className={st.passIcon} onClick={handleVisiblePass} />
  ) : (
    <HidePassSvg className={st.passIcon} onClick={handleVisiblePass} />
  );

  return (
    <div className={st.modalWindow}>
      <div className={st.title}>Sign In</div>
      <Formik
        initialValues={initialValues}
        validate={validationForm}
        onSubmit={onSubmitForm}
      >
        <Form className={st.form}>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            icon={<ManIconSvg className={st.svg} />}
          />
          <Field
            name="password"
            type={isVisiblePass ? 'text' : 'password'}
            placeholder="Password"
            icon={<PasswordSvg className={st.svg} />}
            passIcon={passIcon}
          />
          <div className={st.formButtons}>
            <Button className={st.formButtonsSignIn} type="submit">
              Sign In
            </Button>
            <Button
              className={st.formButtonsClose}
              type="button"
              onClick={handleSignIn}
            >
              <CloseSvg />
              <span>Cancel</span>
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

SignIn.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
};
