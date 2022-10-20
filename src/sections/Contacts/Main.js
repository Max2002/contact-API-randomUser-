import moment from 'moment';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { ContactCard, CopyElement, Table } from '../../components';
import { getContact } from '../../redux/actionCreator/getViewContact';
import { NoDataSvg } from '../../assets/icons';
import { CONTACTS } from '../../constans/routes';
import { AMOUNT_CONTACTS, AMOUNT_PAGES } from '../../constans/amountContacts';
import st from './styles.module.scss';

export default function Main({ contacts, viewContacts }) {
  const deviceWidth = useDeviceWidth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contactView = (index, id) => {
    navigate(`${CONTACTS}/${index + 1}`);
    localStorage.setItem('contactView', id);
    dispatch(getContact(id, AMOUNT_PAGES, AMOUNT_CONTACTS));
  };

  const renderContacts = (flagCard) => {
    return contacts.map((contact, index) => {
      const { picture, name, dob, email, phone, location, nat, login } =
        contact;
      const { title, first, last } = name;
      const { date, age } = dob;
      const { country, street, city, state, postcode } = location;
      const address = `/${country}/ ${street.number} ${street.name}, ${city}, ${state} ${postcode}`;
      const dateFormat = moment(date).format('dddd, MM/DD/yyyy, h:MM:ss A');

      if (flagCard) {
        const personalInfoContact = {
          avatar: picture.large,
          fullName: `${title}. ${first} ${last}`,
          age,
          email,
          phone,
          address,
          nat,
        };

        return (
          <ContactCard
            contactView={contactView}
            contact={personalInfoContact}
            index={index}
            id={login.uuid}
          />
        );
      }

      return {
        avatar: (
          <img
            className={st.avatar}
            src={picture.thumbnail}
            alt={`${first}${last}`}
            onClick={() => contactView(index, login.uuid)}
          />
        ),
        fullName: [title, `${first} ${last}`],
        birthday: (
          <span>
            {dateFormat}
            <br />
            {age} years
          </span>
        ),
        email: <CopyElement content={email} link={`mailto:${email}`} />,
        phone: <CopyElement content={phone} link={`tel:${phone}`} />,
        location: <CopyElement content={address} />,
        nat: <span className={st.nat}>{nat}</span>,
      };
    });
  };

  const tableColumns = [
    'Avatar',
    'Full name',
    'Birthday',
    'Email',
    'Phone',
    'Location',
    'Nationality',
  ];

  if (contacts[0] === 'No data') {
    return (
      <div className={st.noData}>
        <NoDataSvg className={st.noDataSvg} />
        <p>No Data</p>
      </div>
    );
  }

  return viewContacts || deviceWidth < 992 ? (
    <div className={st.blocksView}>{renderContacts(true)}</div>
  ) : (
    <Table columns={tableColumns} options={renderContacts(false)} />
  );
}

Main.propTypes = {
  contacts: PropTypes.array.isRequired,
  viewContacts: PropTypes.bool.isRequired,
};
