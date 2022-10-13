import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CopiedSvg, CopySvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function CopyElement({ content, link, prefixLink }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    const interval = setInterval(() => setIsCopied(false), 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isCopied]);

  return (
    <div className={st.contact}>
      <div className={st.icon}>
        <div className={st.copy}>{isCopied ? 'Copied' : 'Copy'}</div>
        {isCopied ? (
          <CopiedSvg className={st.copied} />
        ) : (
          <CopySvg onClick={() => handleCopy(content)} />
        )}
      </div>
      {link ? (
        <a className={st.link} href={`${prefixLink}${content}`}>
          {content}
        </a>
      ) : (
        <span className={st.text}>{content}</span>
      )}
    </div>
  );
}

CopyElement.defaultProps = {
  content: '',
  link: false,
  prefixLink: '',
};

CopyElement.propTypes = {
  content: PropTypes.string,
  link: PropTypes.bool,
  prefixLink: PropTypes.string,
};
