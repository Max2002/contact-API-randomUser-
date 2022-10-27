import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect } from 'react';
import {
  addressSelector,
  ageSelector,
  avatarSelector,
  emailSelector,
  fullNameSelector,
  nationalitySelector,
  phoneSelector,
} from '../../redux/selectors/getViewContact';
import ContactInfo from '../../components/ContactInfo';
import { getContact } from '../../redux/actionCreator/getViewContact';
import { AMOUNT_CONTACTS, AMOUNT_PAGES } from '../../constans/amountContacts';

const contactSelector = createStructuredSelector({
  picture: avatarSelector,
  fullName: fullNameSelector,
  age: ageSelector,
  email: emailSelector,
  phone: phoneSelector,
  address: addressSelector,
  nat: nationalitySelector,
});

export default function Contact() {
  const dispatch = useDispatch();
  const contact = useSelector(contactSelector);
  const { picture, fullName, age, email, phone, address, nat } = contact;

  useEffect(() => {
    dispatch(
      getContact(
        localStorage.getItem('contactView'),
        AMOUNT_PAGES,
        AMOUNT_CONTACTS,
      ),
    );
  }, []);

  return (
    <ContactInfo
      title="Contact View"
      avatar={picture?.large}
      fullName={fullName}
      age={age}
      email={email}
      phone={phone}
      address={address}
      nat={nat}
    />
  );
}
