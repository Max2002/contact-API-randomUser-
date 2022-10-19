import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SortASCSvg, SortDESCSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Table({ columns, options }) {
  const [sortByName, setSortByName] = useState(null);
  const sortOptions =
    sortByName === 'asc'
      ? options
          .slice()
          .sort((a, b) => a.fullName[1].localeCompare(b.fullName[1]))
      : options
          .slice()
          .sort((a, b) => b.fullName[1].localeCompare(a.fullName[1]));

  const renderRows = (option) => (
    <tr>
      {Object.keys(option).map((key) => (
        <td key={key} className={key === 'email' ? st.email : null}>
          {Array.isArray(option[key])
            ? `${option[key][0]}. ${option[key][1]}`
            : option[key]}
        </td>
      ))}
    </tr>
  );

  const handleSortByName = () => {
    if (!sortByName) {
      setSortByName('asc');
    } else if (sortByName === 'asc') {
      setSortByName('desc');
    } else {
      setSortByName(null);
    }
  };

  return (
    <table className={st.table}>
      <tr className={st.firstRow}>
        {columns.map((column) => (
          <td
            className={clsx('', { [st.sortColumn]: column === 'Full name' })}
            onClick={column === 'Full name' && handleSortByName}
          >
            {column}
            {column === 'Full name' && (
              <div className={st.sortIcons}>
                <SortASCSvg
                  className={clsx('', {
                    [st.activeIconSort]: sortByName === 'asc',
                  })}
                />
                <SortDESCSvg
                  className={clsx('', {
                    [st.activeIconSort]: sortByName === 'desc',
                  })}
                />
              </div>
            )}
          </td>
        ))}
      </tr>
      {!sortByName ? options.map(renderRows) : sortOptions.map(renderRows)}
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      fullName: PropTypes.arrayOf(PropTypes.string),
      age: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      email: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      phone: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      address: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      nat: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    }),
  ).isRequired,
};
