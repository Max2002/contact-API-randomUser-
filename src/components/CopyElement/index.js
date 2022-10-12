import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopiedSvg, CopySvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function CopyElement({ children, isLink, prefixLink }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
  };

  useEffect(() => {
    const interval = setInterval(() => setIsCopied(false), 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isCopied]);

  const renderPrefix = () => (
    <div className={st.icon}>
      <div className={st.copy}>{isCopied ? 'Copied' : 'Copy'}</div>
      <CopyToClipboard text={children}>
        {isCopied ? (
          <CopiedSvg className={st.copied} />
        ) : (
          <CopySvg onClick={handleCopy} />
        )}
      </CopyToClipboard>
    </div>
  );

  return (
    <div className={st.contact}>
      {renderPrefix()}
      {isLink ? (
        <a href={`${prefixLink}${children}`}>{children}</a>
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
}

CopyElement.defaultProps = {
  children: '',
  isLink: false,
  prefixLink: '',
};

CopyElement.propTypes = {
  children: PropTypes.string,
  isLink: PropTypes.bool,
  prefixLink: PropTypes.string,
};
