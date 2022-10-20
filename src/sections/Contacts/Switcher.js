import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ArrowNextSvg, ArrowPrevSvg } from '../../assets/icons';
import st from './styles.module.scss';
import { Button } from '../../components';

export default function Switcher(props) {
  const { handleCurrentPage, onClickListItem, currentPage, amountPage } = props;
  const pages = Array.from({ length: amountPage }, (v, k) => k + 1);

  return (
    <div className={st.switcher}>
      <Button
        type="button"
        className={st.arrowSwitch}
        onClick={() => handleCurrentPage(false)}
        // disabled={disablePrev}
      >
        <ArrowPrevSvg />
      </Button>
      <uL className={st.listNumber}>
        {pages.map((page) => (
          <li
            className={clsx(st.item, {
              [st.activeItem]: currentPage === page,
            })}
            onClick={() => onClickListItem(page)}
          >
            {page}
          </li>
        ))}
      </uL>
      <Button
        type="button"
        className={st.arrowSwitch}
        onClick={() => handleCurrentPage(true)}
        // disabled={disableNext}
      >
        <ArrowNextSvg />
      </Button>
    </div>
  );
}

Switcher.propTypes = {
  handleCurrentPage: PropTypes.func.isRequired,
  onClickListItem: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  amountPage: PropTypes.number.isRequired,
};
