import { Formik, Form } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { validationEmail, validationPassword } from '../../utils/validation';
import st from './signIn.module.scss';
import Field from '../../components/Input';
import Button from '../../components/Button';
import {
  CloseSvg,
  ManIconSvg,
  HidePassSvg,
  PasswordSvg,
  VisiblePassSvg,
} from '../../assets/icons';
import { actionCreatorAuthUser } from '../../redux/actionCreator/actionCreatorAuthUser';

const initialValues = {
  email: '',
  password: '',
};
const inputs = {
  email: {
    type: 'email',
    placeholder: 'Email',
  },
  password: {
    type: 'password',
    placeholder: 'Password',
  },
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
    } else if (validationEmail(email)) {
      errors.email = 'Invalid email address!';
    }

    if (password === '') {
      errors.password = 'Password is required!';
    } else if (validationPassword(password)) {
      errors.password = 'Password incorrect, please change password!';
    }

    return errors;
  };

  const onSubmitForm = (data) => {
    localStorage.setItem(data.email, JSON.stringify(data));
    localStorage.setItem('auth', data.email);
    dispatch(actionCreatorAuthUser(data.email));
    handleSignIn();
  };

  const contentInputs = () =>
    Object.keys(inputs).map((item) => {
      const { type, placeholder } = inputs[item];
      const svg =
        type === 'email' ? (
          <ManIconSvg className={st.svg} />
        ) : (
          <PasswordSvg className={st.svg} />
        );
      const passIcon = isVisiblePass ? (
        <VisiblePassSvg className={st.passIcon} onClick={handleVisiblePass} />
      ) : (
        <HidePassSvg className={st.passIcon} onClick={handleVisiblePass} />
      );

      return (
        <Field
          key={item}
          name={item}
          type={type === 'password' && isVisiblePass ? 'text' : type}
          placeholder={placeholder}
          svg={svg}
          passIcon={type === 'password' && passIcon}
        />
      );
    });

  return (
    <div className={st.modalWindow}>
      <div className={st.title}>Sign In</div>
      <Formik
        initialValues={initialValues}
        validate={(values) => validationForm(values)}
        onSubmit={(data) => onSubmitForm(data)}
      >
        {() => {
          return (
            <Form className={st.form}>
              {contentInputs()}
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
          );
        }}
      </Formik>
    </div>
  );
}

SignIn.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
};
