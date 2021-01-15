import React, { useState } from 'react';

const SelectNumberSetting = ({
  title,
  defaultValue,
  isDisabled,
  min,
  step,
  max,
}) => {
  const [value, setValue] = useState(defaultValue);

  const onValueSet = (newValue) => {
    setValue(newValue);
    console.log(
      `Setting room's "${title}" to ${newValue}. Send this to server`,
    );
  };

  const options = [];
  for (let i = min; i <= max; i += step) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div>
      <label>{title}</label>
      <select
        disabled={isDisabled}
        value={value}
        onChange={(e) => onValueSet(Number(e.target.value))}
      >
        {options}
      </select>
    </div>
  );
};

export { SelectNumberSetting };
