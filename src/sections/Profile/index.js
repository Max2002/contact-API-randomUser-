import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import {
  ageSelector,
  avatarSelector,
  emailSelector,
  fullNameSelector,
  phoneSelector,
  addressSelector,
  nationalitySelector,
} from '../../redux/selectors/getMyProfile';
import { CopySvg, CopiedSvg } from '../../assets/icons';
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
  const [isCopied, setIsCopied] = useState({
    email: false,
    phone: false,
    address: false,
  });

  useEffect(() => {
    const interval = setInterval(
      () => setIsCopied({ email: false, phone: false, address: false }),
      2000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [isCopied]);

  const { picture, fullName, age, email, phone, address, nat } =
    useSelector(myProfileSelector);

  const handleCopy = (name) => {
    setIsCopied({ ...isCopied, [name]: true });
  };

  const renderCopyIcon = (name) => (
    <div className={st.icon}>
      <div className={st.copy}>{isCopied[name] ? 'Copied' : 'Copy'}</div>
      <CopyToClipboard text={name}>
        {isCopied[name] ? (
          <CopiedSvg className={st.copied} />
        ) : (
          <CopySvg onClick={() => handleCopy(name)} />
        )}
      </CopyToClipboard>
    </div>
  );

  const renderElement = (element, flag, width = 375, height = 15) => {
    return flag ? element : <Skeleton width={width} height={height} />;
  };

  return (
    <div className={`container ${st.profile}`}>
      <h1 className={st.title}>Profile</h1>
      <div className={st.data}>
        {renderElement(
          <img className={st.avatar} src={picture.large} alt={fullName} />,
          picture.large,
          260,
          260,
        )}
        <div className={st.personalInfo}>
          {renderElement(
            <h3 className={`${st.fullName} ${st.borderDashed}`}>
              {fullName} <span>({age} years)</span>
            </h3>,
            age,
          )}
          {renderElement(
            <div className={st.contact}>
              {renderCopyIcon('email')}
              <a href={email}>{email}</a>
            </div>,
            email,
          )}
          {renderElement(
            <div className={st.contact}>
              {renderCopyIcon('phone')}
              <a href={`tel:${phone}`}>{phone}</a>
            </div>,
            phone,
          )}
          {renderElement(
            <div className={`${st.contact} ${st.borderDashed}`}>
              {renderCopyIcon('address')}
              <span className={st.address}>{address}</span>
            </div>,
            address,
          )}
          {renderElement(
            <span className={st.nationality}>{nat}</span>,
            nat,
            40,
          )}
        </div>
      </div>
    </div>
  );
}
