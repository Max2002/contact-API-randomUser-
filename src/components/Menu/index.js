import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DropDownSvg } from '../../assets/icons';
import st from './styles.module.scss';
import LoadingElement from '../LoadingElement';

export default function Menu(props) {
  const { label, avatar, options, loading } = props;

  const renderMenuItem = (item) => {
    const { title, icon, link, onClick, hide } = item;

    return (
      !hide && (
        <li key={title} className={st.listItem} onClick={onClick}>
          {icon}
          {link ? <Link to={link}>{title}</Link> : <span>{title}</span>}
        </li>
      )
    );
  };

  const contentList = options.map(renderMenuItem);

  return (
    <div className={st.welcomeUser}>
      <LoadingElement
        flag={!loading}
        element={<p className={st.label}>Hello! {label}</p>}
        width={200}
      />
      <DropDownSvg className={st.dropDownSvg} />
      <LoadingElement
        flag={!loading}
        element={<img className={st.avatar} src={avatar} alt={label} />}
        width={50}
        height={50}
      />
      <div className={st.dropDownList}>
        <ul className={st.list}>{contentList}</ul>
      </div>
    </div>
  );
}

Menu.defaultProps = {
  avatar: '',
};

Menu.propTypes = {
  label: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.node,
      link: PropTypes.string,
      onClick: PropTypes.func,
      hide: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
