import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CopyElement from '../../components/CopyElement';
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
import LoadingElement from '../../components/LoadingElement';

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
    <div className={`container ${st.profile}`}>
      <h1 className={st.title}>Profile</h1>
      <div className={st.data}>
        <LoadingElement
          flag={picture.large}
          element={
            <img className={st.avatar} src={picture.large} alt={fullName} />
          }
          width={260}
          height={260}
        />
        <div>
          <LoadingElement
            flag={age}
            element={
              <h3 className={`${st.fullName} ${st.borderDashed}`}>
                {fullName} <span>({age} years)</span>
              </h3>
            }
          />
          <LoadingElement
            flag={email}
            element={<CopyElement link prefixLink="mailto:" content={email} />}
          />
          <LoadingElement
            flag={phone}
            element={<CopyElement link prefixLink="tel:" content={phone} />}
          />
          <LoadingElement
            flag={address}
            element={<CopyElement content={address} />}
          />
          <LoadingElement
            flag={nat}
            element={<span className={st.nationality}>{nat}</span>}
            width={40}
          />
        </div>
      </div>
    </div>
  );
}
