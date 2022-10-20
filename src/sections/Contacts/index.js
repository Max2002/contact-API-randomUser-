import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { dataSelector } from '../../redux/selectors/getContacts';
import { getContacts } from '../../redux/actionCreator/getContacts';
import { Button } from '../../components';
import Filters from './Filters';
import Statistic from '../Statistic';
import Main from './Main';
import Switcher from './Switcher';
import Container from '../../components/Container';
import { PlateSvg, ReloadSvg, TableSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Contacts() {
  const [viewContacts, setViewContacts] = useState(false);
  const [filteredContacts, setFilterContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const deviceWidth = useDeviceWidth();
  const contacts = useSelector(dataSelector);
  const nationalities = [...new Set(contacts.map((contact) => contact.nat))];

  const dispatchContacts = () => dispatch(getContacts(1, 30));

  const handleViewContacts = () => setViewContacts(!viewContacts);
  const updateContacts = () => dispatchContacts();

  useEffect(() => {
    dispatchContacts();
  }, []);

  const filterOrNotContacts =
    filteredContacts.length === 0 ? contacts : filteredContacts;
  const resContacts = filterOrNotContacts.slice(
    currentPage - 1 === 0 ? 1 : (currentPage - 1) * 10,
    currentPage * 10,
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
      <Switcher
        handleCurrentPage={handleCurrentPage}
        onClickListItem={onClickListItem}
        currentPage={currentPage}
        amountPage={filterOrNotContacts.length / 10}
      />
      <Main viewContacts={viewContacts} contacts={resContacts} />
      <Statistic contacts={filterOrNotContacts} />
    </Container>
  );
}
