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
    <div>
      <label>{title}</label>
      <input
        type="checkbox"
        disabled={isDisabled}
        checked={checked}
        onChange={onCheckToggle}
      ></input>
    </div>
  );
};

export { CheckboxSetting };
