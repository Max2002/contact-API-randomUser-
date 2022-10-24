import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components';
import {
  ArrowNextSvg,
  ArrowPrevSvg,
  DoubleArrowSvg,
  DropDownSvg,
} from '../../assets/icons';
import st from './styles.module.scss';

export default function SelectorPage(props) {
  const {
    handleCurrentPage,
    onClickListItem,
    currentPage,
    amountPage,
    handleContactsOnPage,
  } = props;
  const [nextArrow, setNextArrow] = useState(false);
  const [prevArrow, setPrevArrow] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [valueSelectField, setValueSelectField] = useState('10 / page');
  const refSelect = useRef(null);
  const pages = Array.from({ length: amountPage }, (v, k) => k + 1);

  useEffect(() => {
    const handleNotCalendar = (e) => {
      if (!refSelect.current.contains(e.target)) {
        setActiveDropDown(false);
      }
    };

    window.addEventListener('click', handleNotCalendar);

    return () => window.removeEventListener('click', handleNotCalendar);
  });

  useEffect(() => {
    if (currentPage === pages.length) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (currentPage === 1) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [currentPage]);

  const renderListItem = () => {
    const copyPages =
      currentPage < 5
        ? pages.slice(1, 5)
        : pages.slice(currentPage - 3, currentPage + 2);

    return copyPages.map((page) => (
      <li
        key={page}
        className={clsx(st.item, {
          [st.activeItem]: currentPage === page,
        })}
        onClick={() => onClickListItem(page)}
      >
        {page}
      </li>
    ));
  };

  const mouseEventNextArrow = () => setNextArrow(!nextArrow);
  const mouseEventPrevArrow = () => setPrevArrow(!prevArrow);
  const handleActiveDropDown = () => setActiveDropDown(!activeDropDown);
  const setValueField = (value) => {
    setValueSelectField(`${value} / page`);
    handleContactsOnPage(value);
  };

  return (
    <div className={st.switcher}>
      <Button
        type="button"
        className={st.arrowSwitch}
        onClick={() => handleCurrentPage(false)}
        disabled={prevDisabled}
      >
        <ArrowPrevSvg />
      </Button>
      <uL className={st.listNumber}>
        <li
          className={clsx(st.item, {
            [st.activeItem]: currentPage === 1,
          })}
          onClick={() => onClickListItem(1)}
        >
          1
        </li>
        {currentPage > 4 && (
          <li
            className={clsx(st.item, st.dots)}
            onClick={() => onClickListItem(currentPage - 3)}
            onMouseEnter={mouseEventPrevArrow}
            onMouseLeave={mouseEventPrevArrow}
          >
            {prevArrow ? <DoubleArrowSvg /> : '•••'}
          </li>
        )}
        {renderListItem()}
        {currentPage < pages.length - 3 && (
          <li
            className={clsx(st.item, st.dots)}
            onClick={() => onClickListItem(currentPage + 3)}
            onMouseEnter={mouseEventNextArrow}
            onMouseLeave={mouseEventNextArrow}
          >
            {nextArrow ? <DoubleArrowSvg className={st.nextArrow} /> : '•••'}
          </li>
        )}
        {currentPage + 2 <= pages.length - 1 && (
          <li
            className={clsx(st.item, {
              [st.activeItem]: currentPage === pages.length,
            })}
            onClick={() => onClickListItem(pages.length)}
          >
            {pages.length}
          </li>
        )}
      </uL>
      <Button
        type="button"
        className={clsx(st.arrowSwitch, st.btnNext)}
        onClick={() => handleCurrentPage(true)}
        disabled={nextDisabled}
      >
        <ArrowNextSvg />
      </Button>
      <div className={st.selectWrapper}>
        <div
          className={clsx(st.dropDownSelect, {
            [st.activeSelect]: activeDropDown,
          })}
        >
          <span className={st.selectItem} onClick={() => setValueField(10)}>
            10 / page
          </span>
          <span className={st.selectItem} onClick={() => setValueField(20)}>
            20 / page
          </span>
          <span className={st.selectItem} onClick={() => setValueField(50)}>
            50 / page
          </span>
          <span className={st.selectItem} onClick={() => setValueField(100)}>
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
            value={valueSelectField}
            readOnly
            onClick={handleActiveDropDown}
          />
        </div>
      </div>
    </div>
  );
}

SelectorPage.propTypes = {
  handleCurrentPage: PropTypes.func.isRequired,
  onClickListItem: PropTypes.func.isRequired,
  handleContactsOnPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  amountPage: PropTypes.number.isRequired,
};
