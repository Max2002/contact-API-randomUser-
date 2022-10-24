import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DropDownSvg } from '../../assets/icons';
import LoadingElement from '../LoadingElement';
import st from './styles.module.scss';

export default function Menu(props) {
  const { label, avatarUrl, options, loading } = props;

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
      <LoadingElement loading={loading} width={200}>
        <p className={st.label}>Hello! {label}</p>
      </LoadingElement>
      <DropDownSvg className={st.dropDownSvg} />
      <LoadingElement loading={loading} width={50} height={50}>
        <img className={st.avatar} src={avatarUrl} alt={label} />
      </LoadingElement>
      <ul className={st.dropDownList}>{contentList}</ul>
    </div>
  );
}

Menu.defaultProps = {
  avatarUrl: '',
};

Menu.propTypes = {
  label: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
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
