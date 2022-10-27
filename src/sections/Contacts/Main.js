import moment from 'moment';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CopyElement, Table } from '../../components';
import { getContact } from '../../redux/actionCreator/getViewContact';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { NoDataSvg } from '../../assets/icons';
import { CONTACTS } from '../../constans/routes';
import { AMOUNT_CONTACTS, AMOUNT_PAGES } from '../../constans/amountContacts';
import st from './styles.module.scss';
import ContactCard from '../../components/ContactCard';

export default function Main({ contacts, flagView }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const widthDevice = useDeviceWidth();

  const contactView = (id) => {
    navigate(`${CONTACTS}/${id}`);
    localStorage.setItem('contactView', id);
    dispatch(getContact(id, AMOUNT_PAGES, AMOUNT_CONTACTS));
  };

  const renderContacts = () => {
    return contacts.map((contact) => {
      const { picture, name, dob, email, phone, location, nat, login } =
        contact;
      const { title, first, last } = name;
      const { date, age } = dob;
      const { country, street, city, state, postcode } = location;
      const { uuid } = login;
      const address = `/${country}/ ${street.number} ${street.name}, ${city}, ${state} ${postcode}`;
      const dateFormat = moment(date).format('dddd, MM/DD/yyyy, h:MM:ss A');

      if (flagView) {
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
            key={uuid}
            contact={personalInfoContact}
            contactView={contactView}
            id={uuid}
          />
        );
      }

      return [
        {
          key: 'avatar',
          content: (
            <img
              className={st.avatar}
              src={picture.thumbnail}
              alt={`${first}${last}`}
              onClick={() => contactView(uuid)}
            />
          ),
        },
        {
          key: 'fullName',
          content: `${title}. ${first} ${last}`,
          sort: `${first} ${last}`,
        },
        {
          key: 'birthday',
          content: (
            <span>
              {dateFormat}
              <br />
              {age} years
            </span>
          ),
        },
        {
          key: 'email',
          content: (
            <CopyElement
              content={email}
              link={`mailto:${email}`}
              className={st.email}
            />
          ),
        },
        {
          key: 'phone',
          content: <CopyElement content={phone} link={`tel:${phone}`} />,
        },
        { key: 'location', content: <CopyElement content={address} /> },
        { key: 'nat', content: <span className={st.nat}>{nat}</span> },
      ];
    });
  };

  const tableColumns = [
    {
      title: 'Avatar',
      key: 'avatar',
    },
    {
      title: 'Full name',
      key: 'fullName',
      render: (options, flagSort) =>
        options.sort(([, first], [, second]) =>
          flagSort === 'asc'
            ? second.sort.localeCompare(first.sort)
            : first.sort.localeCompare(second.sort),
        ),
    },
    {
      title: 'Birthday',
      key: 'birthday',
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Phone',
      key: 'phone',
    },
    {
      title: 'Location',
      key: 'location',
    },
    {
      title: 'Nationality',
      key: 'nat',
    },
  ];

  if (contacts[0] === 'No data') {
    return (
      <div className={st.noData}>
        <NoDataSvg className={st.noDataSvg} />
        <p>No Data</p>
      </div>
    );
  }

  return widthDevice < 992 || flagView ? (
    <div className={st.blocksView}>{renderContacts()}</div>
  ) : (
    <Table columns={tableColumns} options={renderContacts()} />
  );
}

Main.propTypes = {
  contacts: PropTypes.array.isRequired,
  flagView: PropTypes.bool.isRequired,
};
