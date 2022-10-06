import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ErrorMessage, useField } from 'formik';
import { FormControl } from 'react-bootstrap';
import { HidePassSvg, IconErrorSvg, VisiblePassSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function TextField(props) {
  const { name, type, placeholder, prefix } = props;
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [field, meta] = useField(name);
  const { touched, error } = meta;
  const isError = touched && error;

  const handleVisiblePass = () => setIsVisiblePass(!isVisiblePass);

  const renderSufix = () => (
    <div className={st.wrapperIconsPass}>
      {type === 'password' &&
        (isVisiblePass ? (
          <VisiblePassSvg className={st.eyeIcon} onClick={handleVisiblePass} />
        ) : (
          <HidePassSvg className={st.eyeIcon} onClick={handleVisiblePass} />
        ))}
      {isError && <IconErrorSvg className={st.iconError} />}
    </div>
  );

  return (
    <div className={st.wrapper}>
      <div className={st.wrapperField}>
        {prefix}
        <FormControl
          {...field}
          className={clsx(st.field, { [st.errorField]: isError })}
          type={isVisiblePass ? 'text' : type}
          name={name}
          placeholder={placeholder}
        />
        {renderSufix()}
      </div>
      <ErrorMessage
        name={name}
        className={st.error}
        component={FormControl.Feedback}
      />
    </div>
  );
}

TextField.defaultProps = {
  placeholder: '',
  prefix: null,
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  prefix: PropTypes.node,
};
