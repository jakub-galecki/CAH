import './roomLink.scss';

import React, { useRef } from 'react';

import { toastInfo } from '../../../../utils/toastify/index';

const RoomLink = ({ children }) => {
  const linkSpanRef = useRef();

  const copyLinkToClipbaord = () => {
    if (document.queryCommandSupported('copy')) {
      const range = document.createRange();
      range.selectNode(linkSpanRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      toastInfo('Copied room link to clipboard');
    }
  };

  return (
    <div className="room-link-container">
      <span>Link to this room: </span>
      <span
        ref={linkSpanRef}
        className="link-span"
        onClick={copyLinkToClipbaord}
        value={children}
      >
        {children}
      </span>
    </div>
  );
};

export { RoomLink };
