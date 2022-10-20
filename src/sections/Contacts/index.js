import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { dataSelector } from '../../redux/selectors/getContacts';
import { getContacts } from '../../redux/actionCreator/getContacts';
import { Button, Container } from '../../components';
import Filters from './Filters';
import Statistic from '../Statistic';
import Main from './Main';
import Switcher from './Switcher';
import { PlateSvg, ReloadSvg, TableSvg } from '../../assets/icons';
import st from './styles.module.scss';
import { AMOUNT_CONTACTS, AMOUNT_PAGES } from '../../constans/amountContacts';

export default function Contacts() {
  const [viewContacts, setViewContacts] = useState(false);
  const [filteredContacts, setFilterContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsOnPage, setContactsOnPage] = useState(10);
  const dispatch = useDispatch();
  const deviceWidth = useDeviceWidth();
  const contacts = useSelector(dataSelector);
  const nationalities = [...new Set(contacts.map((contact) => contact.nat))];

  const dispatchContacts = () =>
    dispatch(getContacts(AMOUNT_PAGES, AMOUNT_CONTACTS));

  const handleViewContacts = () => setViewContacts(!viewContacts);
  const updateContacts = () => dispatchContacts();

  useEffect(() => {
    dispatchContacts();
  }, []);

  const filterOrNotContacts =
    filteredContacts.length === 0 ? contacts : filteredContacts;
  const resContacts = filterOrNotContacts.slice(
    currentPage - 1 === 0 ? 0 : (currentPage - 1) * contactsOnPage,
    currentPage * contactsOnPage,
  );

  const handleCurrentPage = (next) => {
    const amountPage = filterOrNotContacts.length / 10;

    if (next) {
      const nextPage = currentPage + 1;

      if (nextPage > amountPage) {
        // setDisableNext(true);
        setCurrentPage(amountPage);
      } else {
        setCurrentPage(nextPage);
      }
    } else {
      const prevPage = currentPage - 1;

      if (prevPage < 1) {
        // setDisablePrev(true);
        setCurrentPage(1);
      } else {
        setCurrentPage(prevPage);
      }
    }
  };

  const onClickListItem = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleContactsOnPage = (amount) => setContactsOnPage(amount);

  const filterByFullName = (value) => {
    const contactsForFilter =
      filterOrNotContacts[0] === 'No data' ? contacts : filterOrNotContacts;
    const filterContacts = contactsForFilter
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

    if (value) {
      setFilterContacts(
        filterContacts.length === 0 ? ['No data'] : filterContacts,
      );
    } else {
      setFilterContacts([]);
    }
  };

  const filterGender = (gender) => {
    if (gender === 'gender') {
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

  return (
    <Container className={st.contacts}>
      <div className={st.head}>
        <h1 className={st.title}>Contacts</h1>
        <div className={st.switchView}>
          <Button className={st.reload} type="button" onClick={updateContacts}>
            <ReloadSvg />
          </Button>
          {deviceWidth > 992 && (
            <>
              <Button
                className={clsx(st.switchBtn, {
                  [st.activeSwitchBtn]: viewContacts,
                })}
                type="button"
                onClick={handleViewContacts}
              >
                <PlateSvg />
              </Button>
              <Button
                className={clsx(st.switchBtn, {
                  [st.activeSwitchBtn]: !viewContacts,
                })}
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
      <Main viewContacts={viewContacts} contacts={resContacts} />
      <Statistic contacts={filterOrNotContacts} />
      {deviceWidth > 992 && (
        <Switcher
          handleCurrentPage={handleCurrentPage}
          onClickListItem={onClickListItem}
          handleContactsOnPage={handleContactsOnPage}
          currentPage={currentPage}
          amountPage={filterOrNotContacts.length / contactsOnPage}
        />
      )}
    </Container>
  );
}
