import PropTypes from 'prop-types';
import moment from 'moment';
import { useState } from 'react';
import clsx from 'clsx';
import CopyElement from '../../components/CopyElement';
import { SortASCSvg, SortDESCSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Table({ contacts }) {
  const [sortByName, setSortByName] = useState([true, false, false]);

  const handleSortByName = () => {
    const trueIndex = sortByName.indexOf(true);
    const newSortByName = sortByName.slice();

    newSortByName[trueIndex] = false;
    const nextIndex = trueIndex + 1 === sortByName.length ? 0 : trueIndex + 1;

    newSortByName[nextIndex] = true;

    setSortByName(newSortByName);
  };

  const rows = (contact) => {
    const { picture, name, dob, email, phone, location, nat } = contact;
    const { title, first, last } = name;
    const { date, age } = dob;
    const { country, street, city, state, postcode } = location;
    const address = `/${country}/ ${street.number} ${street.name}, ${city}, ${state} ${postcode}`;
    const dateFormat = moment(date).format('dddd, MM/DD/yyyy, h:MM:ss A');

    return (
      <tr key={email} className={st.row}>
        <td>
          <img
            className={st.avatar}
            src={picture.thumbnail}
            alt={`${first}${last}`}
          />
        </td>
        <td className={st.fullName}>
          {title} {first} {last}
        </td>
        <td className={st.dob}>
          {dateFormat} <br /> {age} years
        </td>
        <td className={st.email}>
          <CopyElement isLink prefixLink="mailto:">
            {email}
          </CopyElement>
        </td>
        <td className={st.phone}>
          <CopyElement isLink prefixLink="tel:">
            {phone}
          </CopyElement>
        </td>
        <td className={st.address}>
          <CopyElement>{address}</CopyElement>
        </td>
        <td>
          <span className={st.nat}>{nat}</span>
        </td>
      </tr>
    );
  };

  const renderRows = () => {
    if (sortByName[1]) {
      return contacts
        .slice()
        .sort((a, b) => b.name.first.localeCompare(a.name.first))
        .map(rows);
    }

    if (sortByName[2]) {
      return contacts
        .slice()
        .sort((a, b) => a.name.first.localeCompare(b.name.first))
        .map(rows);
    }

    return contacts.map(rows);
  };

  return (
    <table className={st.table}>
      <tr className={st.firstRow}>
        <td>Avatar</td>
        <td
          className={st.fullNameSort}
          onClick={() => handleSortByName('nothing')}
        >
          Full name
          <div className={st.sortIcons}>
            <SortASCSvg
              className={clsx('', { [st.activeIconSort]: sortByName[1] })}
            />
            <SortDESCSvg
              className={clsx('', { [st.activeIconSort]: sortByName[2] })}
            />
          </div>
        </td>
        <td>Birthday</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Location</td>
        <td>Nationality</td>
      </tr>
      {renderRows()}
    </table>
  );
}

Table.propTypes = {
  contacts: PropTypes.array.isRequired,
};
