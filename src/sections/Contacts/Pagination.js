import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { Button } from '../../components';
import { ArrowNextSvg, ArrowPrevSvg, DropDownSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Pagination({ total, setSlices }) {
  const [contactsOnPage, setContactsOnPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropDown, setActiveDropDown] = useState(false);
  const widthDevice = useDeviceWidth();
  const refSelect = useRef(null);
  const amountPages = total / contactsOnPage;
  const pages = Array.from({ length: amountPages - 2 }, (_, k) => k + 2);

  useEffect(() => {
    setSlices({
      from: (currentPage - 1) * contactsOnPage,
      to: currentPage * contactsOnPage,
    });
  }, [currentPage, contactsOnPage]);

  useEffect(() => {
    const handleNotSelectPage = (e) => {
      if (!refSelect.current.contains(e.target)) {
        setActiveDropDown(false);
      }
    };

    window.addEventListener('click', handleNotSelectPage);

    return () => window.removeEventListener('click', handleNotSelectPage);
  }, []);

  const setCurrent = (newPage) => setCurrentPage(newPage);

  const renderPages = () => {
    const slicePages =
      currentPage < 5
        ? pages.slice(0, 4)
        : pages.slice(currentPage - 4, currentPage + 1);

    return slicePages.map((page) => (
      <li
        key={page}
        className={clsx(st.item, {
          [st.activeItem]: currentPage === page,
        })}
        onClick={() => setCurrent(page)}
      >
        {page}
      </li>
    ));
  };

  const handleActiveDropDown = () => setActiveDropDown(!activeDropDown);

  return (
    <div className={st.switcher}>
      <Button
        type="button"
        className={st.arrowSwitch}
        onClick={() => setCurrent(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowPrevSvg />
      </Button>
      <ul className={st.listNumber}>
        <li
          className={clsx(st.item, {
            [st.activeItem]: currentPage === 1,
          })}
          onClick={() => setCurrent(1)}
        >
          1
        </li>
        {currentPage > 4 && (
          <li
            className={clsx(st.item, st.dots)}
            onClick={() => setCurrent(currentPage - 3)}
          />
        )}
        {renderPages()}
        {currentPage < amountPages - 3 && (
          <li
            className={clsx(st.item, st.dots, st.nextArrow)}
            onClick={() => setCurrent(currentPage + 3)}
          />
        )}
        <li
          className={clsx(st.item, {
            [st.activeItem]: currentPage === amountPages,
          })}
          onClick={() => setCurrent(amountPages)}
        >
          {amountPages}
        </li>
      </ul>
      <Button
        type="button"
        className={clsx(st.arrowSwitch, st.btnNext)}
        onClick={() => setCurrent(currentPage + 1)}
        disabled={currentPage === amountPages}
      >
        <ArrowNextSvg />
      </Button>
      {widthDevice > 568 && (
        <div className={st.selectWrapper}>
          <div
            className={clsx(st.dropDownSelect, {
              [st.activeSelect]: activeDropDown,
            })}
          >
            <span
              className={st.selectItem}
              onClick={() => setContactsOnPage(10)}
            >
              10 / page
            </span>
            <span
              className={st.selectItem}
              onClick={() => setContactsOnPage(20)}
            >
              20 / page
            </span>
            <span
              className={st.selectItem}
              onClick={() => setContactsOnPage(50)}
            >
              50 / page
            </span>
            <span
              className={st.selectItem}
              onClick={() => setContactsOnPage(100)}
            >
              100 / page
            </span>
          </div>
          <div className={st.select}>
            <DropDownSvg
              className={clsx(st.dropDownSvg, {
                [st.activeDropSvg]: activeDropDown,
              })}
            />
            <input
              className={st.selectField}
              ref={refSelect}
              type="text"
              name="selectPage"
              value={`${contactsOnPage} / page`}
              readOnly
              onClick={handleActiveDropDown}
            />
          </div>
        </div>
      )}
    </div>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  setSlices: PropTypes.func.isRequired,
};
