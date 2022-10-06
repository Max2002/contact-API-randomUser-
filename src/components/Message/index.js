import PropTypes from 'prop-types';
import clsx from 'clsx';
import { CloseLogOut } from '../../assets/icons';
import { Button } from '../index';
import st from './styles.module.scss';

export default function Message(props) {
  const { prefix, message, handleActiveMessage, isActive } = props;

  return (
    <div className={clsx(st.wrapperMessage, { [st.active]: isActive })}>
      {prefix}
      <p className={st.message}>{message}</p>
      <Button
        className={st.closeBtn}
        type="button"
        onClick={handleActiveMessage}
      >
        <CloseLogOut />
      </Button>
    </div>
  );
}

Message.defaultProps = {
  prefix: null,
};

Message.propTypes = {
  prefix: PropTypes.node,
  message: PropTypes.string.isRequired,
  handleActiveMessage: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
