import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SortASCSvg, SortDESCSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Table({ columns, options }) {
  const [sortFlag, setSortFlag] = useState(null);

  const renderRows = (option, index) => (
    <tr key={index}>
      {option.map(({ key, content }) => (
        <td key={key}>{content}</td>
      ))}
    </tr>
  );

  const handleSortFlag = (render) => {
    render(options, sortFlag);

    if (!sortFlag) {
      setSortFlag('asc');
    } else if (sortFlag === 'asc') {
      setSortFlag('desc');
    } else {
      setSortFlag(null);
    }
  };

  return (
    <table className={st.table}>
      <tbody>
        <tr className={st.firstRow}>
          {columns.map(({ key, title, render }) =>
            render ? (
              <td
                className={st.sortColumn}
                onClick={() => handleSortFlag(render)}
                key={key}
              >
                {title}
                <div className={st.sortIcons}>
                  <SortASCSvg
                    className={clsx('', {
                      [st.activeIconSort]: sortFlag === 'asc',
                    })}
                  />
                  <SortDESCSvg
                    className={clsx('', {
                      [st.activeIconSort]: sortFlag === 'desc',
                    })}
                  />
                </div>
              </td>
            ) : (
              <td key={key}>{title}</td>
            ),
          )}
        </tr>
        {options.map(renderRows)}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func,
    }),
  ).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
          .isRequired,
      }),
    ),
  ).isRequired,
};
