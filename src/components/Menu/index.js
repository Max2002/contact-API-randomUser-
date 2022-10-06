import PropTypes from 'prop-types';
import st from './styles.module.scss';

export default function Menu(props) {
  const { label, svg, avatar, options, classNameList } = props;
  const renderMenuItem = (item) => {
    const { title, icon, link, onClick, hide } = item;

    return (
      !hide && (
        <li key={title} className={st.listItem} onClick={onClick}>
          {icon}
          {link ? <a href="#">{title}</a> : <span>{title}</span>}
        </li>
      )
    );
  };

  const contentList = options.map((menuItem) => {
    if (Array.isArray(menuItem)) {
      return menuItem.map(renderMenuItem);
    }

    return renderMenuItem(menuItem);
  });

  return (
    <>
      <p className={st.label}>Hello! {label}</p>
      {svg}
      <img className={st.avatar} src={avatar} alt={label} />
      <div className={classNameList}>
        <ul className={st.list}>{contentList}</ul>
      </div>
    </>
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
  classNameList: PropTypes.string.isRequired,
};
