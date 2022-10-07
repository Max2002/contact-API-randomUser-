import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from '../Header';
import { authSelector } from '../../redux/selectors/getMyProfile';
import { getMyProfile } from '../../redux/actionCreator/getMyProfile';
import st from './styles.module.scss';

export default function WrapperApp({ children }) {
  const dispatch = useDispatch();
  const authKey = useSelector(authSelector);

  useEffect(() => {
    if (authKey) {
      dispatch(getMyProfile(authKey));
    }
  }, []);

  return (
    <div className={st.wrapperApp}>
      <Header />
      {children}
    </div>
  );
}

WrapperApp.propTypes = {
  children: PropTypes.node.isRequired,
};
