import { ErrorMessage, useField } from 'formik';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IconErrorSvg } from '../../assets/icons';
import st from './input.module.scss';

export default function Field(props) {
  const { name, type, placeholder, svg, passIcon } = props;
  const [field, meta] = useField({ name });
  const { touched, error } = meta;
  const isTouched = touched && error;
  const iconError =
    type === 'password' || type === 'text' ? (
      <div className={st.wrapperIconPass}>
        {passIcon}
        {isTouched && <IconErrorSvg className={st.iconError} />}
      </div>
    ) : (
      isTouched && <IconErrorSvg className={st.iconError} />
    );

  return (
    <div className={st.wrapper}>
      <div className={st.wrapperField}>
        {svg}
        <FormControl
          {...field}
          className={isTouched ? st.isError : st.field}
          type={type}
          name={name}
          placeholder={placeholder}
        />
        {iconError}
      </div>
      {isTouched ? (
        <ErrorMessage name={name} className={st.error} component="div" />
      ) : (
        <div className={st.inputMessage}>Type any valid {name}</div>
      )}
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
  svg: PropTypes.node.isRequired,
  passIcon: PropTypes.node,
};
