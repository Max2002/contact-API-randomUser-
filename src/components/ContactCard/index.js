import PropTypes from 'prop-types';
import st from './styles.module.scss';

export default function ContactCard({ img, contactView, id, children }) {
  return (
    <div className={st.contact}>
      {img && (
        <img
          className={st.blocksAvatar}
          src={img}
          alt={img}
          onClick={() => contactView(id)}
        />
      )}
      {children}
    </div>
  );
}

ContactCard.defaultProps = {
  id: null,
  img: null,
};

ContactCard.propTypes = {
  contactView: PropTypes.func.isRequired,
  id: PropTypes.string,
  img: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
