import './checkbox.scss';

import React, { useState } from 'react';

const CheckboxSetting = ({ title, defaultChecked, isDisabled }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const onCheckToggle = () => {
    console.log(
      `Setting room's "${title}" to ${!checked}. Send this to server`,
    );
    setChecked(!checked);
  };

  return (
    <div className="room-setting">
      <label className={`checkbox${isDisabled ? ' disabled' : ''}`}>
        <span className="checkbox__label">{title}</span>
        <span className="checkbox__input">
          <input
            type="checkbox"
            disabled={isDisabled}
            checked={checked}
            onChange={onCheckToggle}
          />
          <span className="checkbox__control">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                d="M1.73 12.91l6.37 6.37L22.79 4.59"
              />
            </svg>
          </span>
        </span>
      </label>
    </div>
  );
};

export { CheckboxSetting };
