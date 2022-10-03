import { ErrorMessage, useField } from 'formik';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IconErrorSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Field(props) {
  const { name, type, placeholder, icon, passIcon } = props;
  const [field, meta] = useField({ name });
  const { touched, error } = meta;
  const isTouched = touched && error;

  const renderIconError = () => {
    if (type === 'password' || type === 'text') {
      return (
        <div className={st.wrapperIconPass}>
          {passIcon}
          {isTouched && <IconErrorSvg className={st.iconError} />}
        </div>
      );
    }

    return isTouched && <IconErrorSvg className={st.iconError} />;
  };

  return (
    <div className={st.wrapper}>
      <div className={st.wrapperField}>
        {icon}
        <FormControl
          {...field}
          className={isTouched ? st.isError : st.field}
          type={type}
          name={name}
          placeholder={placeholder}
        />
        {renderIconError()}
      </div>
      <ErrorMessage
        name={name}
        className={st.error}
        component={FormControl.Feedback}
      />
    </div>
  );
}

Field.defaultProps = {
  placeholder: '',
  passIcon: null,
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.node.isRequired,
  passIcon: PropTypes.node,
};
