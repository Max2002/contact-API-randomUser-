import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CopyElement from '../../components/CopyElement';
import LoadingElement from '../../components/LoadingElement';
import Container from '../../components/Container';
import {
  ageSelector,
  avatarSelector,
  emailSelector,
  fullNameSelector,
  phoneSelector,
  addressSelector,
  nationalitySelector,
} from '../../redux/selectors/getMyProfile';
import st from './styles.module.scss';

const myProfileSelector = createStructuredSelector({
  picture: avatarSelector,
  fullName: fullNameSelector,
  age: ageSelector,
  email: emailSelector,
  phone: phoneSelector,
  address: addressSelector,
  nat: nationalitySelector,
});

export default function Profile() {
  const { picture, fullName, age, email, phone, address, nat } =
    useSelector(myProfileSelector);

  return (
    <Container className={st.profile}>
      <h1 className={st.title}>Profile</h1>
      <div className={st.data}>
        <LoadingElement loading={!picture.large} width={260} height={260}>
          <img className={st.avatar} src={picture.large} alt={fullName} />
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
    </Container>
  );
}
