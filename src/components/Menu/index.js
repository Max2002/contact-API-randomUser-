import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { DropDownSvg } from '../../assets/icons';
import st from './styles.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Menu(props) {
  const { label, avatar, options, loading } = props;

  const renderMenuItem = (item) => {
    const { title, icon, link, path, onClick, hide } = item;

    return (
      !hide && (
        <li key={title} className={st.listItem} onClick={onClick}>
          {icon}
          {link ? <Link to={path}>{title}</Link> : <span>{title}</span>}
        </li>
      )
    );
  };

  const contentList = options.map(renderMenuItem);

  return (
    <div className={st.welcomeUser}>
      {loading ? (
        <Skeleton width={200} height={20} />
      ) : (
        <p className={st.label}>Hello! {label}</p>
      )}
      <DropDownSvg className={st.dropDownSvg} />
      {loading ? (
        <Skeleton circle width={50} height={50} />
      ) : (
        <img className={st.avatar} src={avatar} alt={label} />
      )}
      <div className={st.dropDownList}>
        <ul className={st.list}>{contentList}</ul>
      </div>
    </div>
  );
}

Menu.propTypes = {
  label: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    link: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    hide: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};
