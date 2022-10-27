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
import Pagination from './Pagination';
import { PlateSvg, ReloadSvg, TableSvg } from '../../assets/icons';
import { AMOUNT_CONTACTS, AMOUNT_PAGES } from '../../constans/amountContacts';
import st from './styles.module.scss';

export default function Contacts() {
  const [viewContacts, setViewContacts] = useState(false);
  const [filteredContacts, setFilterContacts] = useState([]);
  const [sliceContacts, setSliceContacts] = useState({ from: 0, to: 10 });
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
    sliceContacts.from,
    sliceContacts.to,
  );

  const setNoData = (resFilter) =>
    setFilterContacts(resFilter.length === 0 ? ['No data'] : resFilter);

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
      setNoData(filterContacts);
    } else {
      setFilterContacts([]);
    }
  };

  const filterGender = (gender) => {
    const filterContacts = contacts
      .slice()
      .filter((contact) => contact.gender === gender.toLowerCase());

    setNoData(filterContacts);
  };

  const filterNat = (nat) => {
    if (nat.length === 0) {
      setFilterContacts([]);
    } else {
      const nats = nat.map(({ value }) => value);
      const filterContacts = contacts
        .slice()
        .filter((contact) => nats.includes(contact.nat));

      setNoData(filterContacts);
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
      <Main contacts={resContacts} flagView={viewContacts} />
      <Statistic contacts={filterOrNotContacts} />
      <Pagination total={contacts.length} setSlices={setSliceContacts} />
    </Container>
  );
}
