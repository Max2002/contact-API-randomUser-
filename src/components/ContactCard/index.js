import PropTypes from 'prop-types';
import clsx from 'clsx';
import CopyElement from '../CopyElement';
import st from './styles.module.scss';

export default function ContactCard({ contact, contactView, index, id }) {
  const { avatar, fullName, age, email, phone, address, nat } = contact;

  return (
    <div className={st.contact}>
      <img
        className={st.blocksAvatar}
        src={avatar}
        alt={fullName}
        onClick={() => contactView(index, id)}
      />
      <div className={st.personalInfo}>
        <p
          className={clsx(st.fullNameBlockView, st.dashedLine)}
          onClick={() => contactView(index, id)}
        >
          {fullName} <span>({age} years)</span>
        </p>
        <CopyElement content={email} link={`mailto:${email}`} />
        <CopyElement content={phone} link={`tel:${phone}`} />
        <CopyElement content={address} />
        <p className={clsx(st.nat, st.natBlocksView)}>{nat}</p>
      </div>
    </div>
  );
}

ContactCard.defaultProps = {
  index: null,
  id: null,
};

ContactCard.propTypes = {
  contactView: PropTypes.func.isRequired,
  index: PropTypes.number,
  id: PropTypes.number,
  contact: PropTypes.shape({
    avatar: PropTypes.string,
    fullName: PropTypes.string,
    age: PropTypes.number,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    nat: PropTypes.string,
  }).isRequired,
};
