import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { dataSelector } from '../../redux/selectors/getContacts';
import { getContacts } from '../../redux/actionCreator/getContacts';
import { Button } from '../../components';
import Statistic from '../Statistic';
import Table from './Table';
import CopyElement from '../../components/CopyElement';
import { PlateSvg, ReloadSvg, TableSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Contacts() {
  const [viewContacts, setViewContacts] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector(dataSelector);
  const deviceWidth = useDeviceWidth();

  const dispatchContacts = () => dispatch(getContacts(1, 10));

  const handleViewContacts = () => setViewContacts(!viewContacts);
  const updateContacts = () => dispatchContacts(1, 10);

  useEffect(() => {
    dispatchContacts();
  }, []);

  const renderBlocksView = (contact) => {
    const { picture, name, dob, email, phone, location, nat } = contact;
    const { title, first, last } = name;
    const { country, street, city, state, postcode } = location;
    const address = `/${country}/ ${street.number} ${street.name}, ${city}, ${state} ${postcode}`;

    return (
      <div className={st.contact}>
        <img
          className={st.blocksAvatar}
          src={picture.large}
          alt={`${first}${last}`}
        />
        <div className={st.personalInfo}>
          <p className={`${st.fullNameBlockView} ${st.dashedLine}`}>
            {title}. {first} {last} <span>({dob.age} years)</span>
          </p>
          <div>
            <CopyElement isLink prefixLink="mailto:">
              {email}
            </CopyElement>
          </div>
          <div className={st.phone}>
            <CopyElement isLink prefixLink="tel:">
              {phone}
            </CopyElement>
          </div>
          <div className={`${st.address} ${st.dashedLine}`}>
            <CopyElement>{address}</CopyElement>
          </div>
          <p className={`${st.nat} ${st.natBlocksView}`}>{nat}</p>
        </div>
      </div>
    );
  };

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
      <div>
        {viewContacts || deviceWidth < 992 ? (
          <div className={st.blocksView}>{contacts.map(renderBlocksView)}</div>
        ) : (
          <Table contacts={contacts} />
        )}
      </div>
      <Statistic contacts={contacts} />
    </main>
  );
}
