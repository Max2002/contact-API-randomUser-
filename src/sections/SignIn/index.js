import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { validationEmail, validationPassword } from '../../utils/validation';
import { Field, Button } from '../../components';
import { CloseSvg, ManIconSvg, PasswordSvg } from '../../assets/icons';
import { getMyProfile } from '../../redux/actionCreator/getMyProfile';
import st from './styles.module.scss';

const initialValues = {
  email: '',
  password: '',
};

export default function SignIn({ handleSignIn }) {
  const dispatch = useDispatch();

  const validationForm = ({ email, password }) => {
    const errors = {};

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
            type="password"
            placeholder="Password"
            icon={<PasswordSvg className={st.svg} />}
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
