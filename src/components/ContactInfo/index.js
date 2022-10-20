import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Container, CopyElement, LoadingElement } from '../index';
import { ArrowBackSvg } from '../../assets/icons';
import { CONTACTS } from '../../constans/routes';
import st from './styles.module.scss';

export default function ContactInfo(props) {
  const { title, avatar, fullName, age, email, phone, address, nat, contact } =
    props;
  const navigate = useNavigate();

  const back = () => navigate(CONTACTS);

  return (
    <Container className={st.profile}>
      <h1 className={st.title}>{title}</h1>
      <div className={st.data}>
        <LoadingElement loading={!avatar} width={260} height={260}>
          <img className={st.avatar} src={avatar} alt={fullName} />
        </LoadingElement>
        <div>
          <LoadingElement loading={!age}>
            <h3 className={`${st.fullName} ${st.borderDashed}`}>
              {fullName} <span className={st.age}>({age} years)</span>
            </h3>
          </LoadingElement>
          <LoadingElement loading={!email}>
            <CopyElement link={`mailto:${email}`} content={email} />
          </LoadingElement>
          <LoadingElement loading={!phone}>
            <CopyElement link={`tel:${phone}`} content={phone} />
          </LoadingElement>
          <LoadingElement loading={!address}>
            <CopyElement content={address} />
          </LoadingElement>
          <LoadingElement loading={!nat} width={40}>
            <span className={st.nationality}>{nat}</span>
          </LoadingElement>
        </div>
      </div>
      {contact && (
        <Button type="button" className={st.back} onClick={back}>
          <ArrowBackSvg className={st.backSvg} />
          Back
        </Button>
      )}
    </Container>
  );
}

ContactInfo.defaultProps = {
  avatar: '',
  fullName: '',
  age: 0,
  email: '',
  phone: '',
  address: '',
  nat: '',
  contact: true,
};

ContactInfo.propTypes = {
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  fullName: PropTypes.string,
  age: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  nat: PropTypes.string,
  contact: PropTypes.bool,
};
