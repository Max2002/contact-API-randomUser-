import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment/moment';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { dataSelector } from '../../redux/selectors/getContacts';
import { getContacts } from '../../redux/actionCreator/getContacts';
import { Button } from '../../components';
import Filters from './Filters';
import Statistic from '../Statistic';
import Table from '../../components/Table';
import { PlateSvg, ReloadSvg, TableSvg } from '../../assets/icons';
import st from './styles.module.scss';
import ContactCard from '../../components/ContactCard';
import CopyElement from '../../components/CopyElement';

export default function Contacts() {
  const [viewContacts, setViewContacts] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector(dataSelector);
  const [filteredContacts, setFilterContacts] = useState([]);
  const deviceWidth = useDeviceWidth();
  const nationalities = [...new Set(contacts.map((contact) => contact.nat))];

  const dispatchContacts = () => dispatch(getContacts(1, 10));

  const handleViewContacts = () => setViewContacts(!viewContacts);
  const updateContacts = () => dispatchContacts();

  useEffect(() => {
    dispatchContacts();
  }, []);

  const filterByFullName = (value) => {
    const filterContacts = contacts
      .slice()
      .map((contact) => {
        const {
          name: { title, first, last },
        } = contact;

        return (
          `${title}. ${first} ${last}`.toLowerCase().includes(value) && contact
        );
      })
      .filter((contact) => contact);

    setFilterContacts(
      filterContacts.length === 0 ? ['No data'] : filterContacts,
    );
  };

  const filterGender = (gender) => {
    if (gender === 'gender') {
      dispatchContacts();
      setFilterContacts([]);
    } else {
      const filterContacts = contacts
        .slice()
        .filter((contact) => contact.gender === gender.toLowerCase());

      setFilterContacts(
        filterContacts.length === 0 ? ['No data'] : filterContacts,
      );
    }
  };

  const filterNat = (nat) => {
    if (nat.length === 0) {
      dispatchContacts();
      setFilterContacts([]);
    } else {
      const nats = nat.map(({ value }) => value);
      const filterContacts = contacts
        .slice()
        .filter((contact) => nats.includes(contact.nat));

      setFilterContacts(
        filterContacts.length === 0 ? ['No data'] : filterContacts,
      );
    }
  };

  const resContacts =
    filteredContacts.length === 0 ? contacts : filteredContacts;

  const renderContacts = (flagCard) => {
    return resContacts.map((contact) => {
      const { picture, name, dob, email, phone, location, nat } = contact;
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

        return <ContactCard contact={personalInfoContact} />;
      }

      return {
        avatar: (
          <img
            className={st.avatar}
            src={picture.thumbnail}
            alt={`${first}${last}`}
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
        email: (
          <CopyElement isLink prefixLink="mailto:">
            {email}
          </CopyElement>
        ),
        phone: (
          <CopyElement isLink prefixLink="tel:">
            {phone}
          </CopyElement>
        ),
        location: <CopyElement>{address}</CopyElement>,
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

  return (
    <main className={`container ${st.contacts}`}>
      <div className={st.head}>
        <h1 className={st.title}>Contacts</h1>
        <div className={st.switchView}>
          <Button className={st.reload} type="button" onClick={updateContacts}>
            <ReloadSvg />
          </Button>
          {deviceWidth > 992 && (
            <>
              <Button
                className={clsx(st.switchBtn, { [st.active]: viewContacts })}
                type="button"
                onClick={handleViewContacts}
              >
                <PlateSvg />
              </Button>
              <Button
                className={clsx(st.switchBtn, { [st.active]: !viewContacts })}
                type="button"
                onClick={handleViewContacts}
              >
                <TableSvg />
              </Button>
            </>
          )}
        </div>
      </div>
      <Filters
        filterByName={filterByFullName}
        filterGender={filterGender}
        filterNat={filterNat}
        nationalities={nationalities}
      />
      {resContacts[0] === 'No data' ? (
        <div>No data</div>
      ) : (
        <>
          <div>
            {viewContacts || deviceWidth < 992 ? (
              <div className={st.blocksView}>{renderContacts(true)}</div>
            ) : (
              <Table columns={tableColumns} options={renderContacts(false)} />
            )}
          </div>
          <Statistic contacts={resContacts} />
        </>
      )}
    </main>
  );
}
