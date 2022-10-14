import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Skeleton from 'react-loading-skeleton';
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

  const renderElement = (element, flag, width = 375, height = 15) => {
    return flag ? (
      element
    ) : (
      <Skeleton className={st.skeleton} width={width} height={height} />
    );
  };

  return (
    <main className={`container ${st.profile}`}>
      <h1 className={st.title}>Profile</h1>
      <div className={st.data}>
        {renderElement(
          <img className={st.avatar} src={picture.large} alt={fullName} />,
          picture.large,
          260,
          260,
        )}
        <div>
          {renderElement(
            <h3 className={`${st.fullName} ${st.borderDashed}`}>
              {fullName} <span>({age} years)</span>
            </h3>,
            age,
          )}
          {renderElement(
            <CopyElement isLink prefixLink="mailto:">
              {email}
            </CopyElement>,
            email,
          )}
          {renderElement(
            <CopyElement isLink prefixLink="tel:">
              {phone}
            </CopyElement>,
            phone,
          )}
          {renderElement(<CopyElement>{address}</CopyElement>, address)}
          {renderElement(
            <span className={st.nationality}>{nat}</span>,
            nat,
            40,
          )}
        </div>
      </div>
    </main>
  );
}
