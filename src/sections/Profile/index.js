import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  ageSelector,
  avatarSelector,
  emailSelector,
  fullNameSelector,
  phoneSelector,
  addressSelector,
  nationalitySelector,
} from '../../redux/selectors/getMyProfile';
import ContactInfo from '../../components/ContactInfo';

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
    <ContactInfo
      title="Profile"
      avatar={picture.large}
      fullName={fullName}
      age={age}
      email={email}
      phone={phone}
      address={address}
      nat={nat}
      contact={false}
    />
  );
}
