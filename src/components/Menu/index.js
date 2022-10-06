import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import st from './styles.module.scss';

export default function Menu(props) {
  const { label, svg, avatar, options } = props;

  const renderMenuItem = (item) => {
    const { title, icon, link, onClick, hide } = item;
    const to = title === 'Home' ? '/' : `../${title}`;

    return (
      !hide && (
        <li key={title} className={st.listItem} onClick={onClick}>
          {icon}
          {link ? <Link to={to}>{title}</Link> : <span>{title}</span>}
        </li>
      )
    );
  };

  const contentList = options.map(renderMenuItem);

  return (
    <div className={st.welcomeUser}>
      <p className={st.label}>Hello! {label}</p>
      {svg}
      <img className={st.avatar} src={avatar} alt={label} />
      <div className={st.dropDownList}>
        <ul className={st.list}>{contentList}</ul>
      </div>
    </div>
  );
}

Menu.defaultProps = {
  svg: null,
};

Menu.propTypes = {
  label: PropTypes.string.isRequired,
  svg: PropTypes.node,
  avatar: PropTypes.string.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    link: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    hide: PropTypes.bool,
  }).isRequired,
};
