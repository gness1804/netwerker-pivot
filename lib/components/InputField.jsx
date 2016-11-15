import React from 'react';

const InputField = ({ className, value, type, handleChange, placeholder, name, objName }) => {
	return (
	  <input
	    className={className}
	    value={value}
	    type={type}
	    name={name}
	    placeholder={placeholder}
	    onChange={(e) => { handleChange(e, name, objName); }}
	  />
  );
};

export default InputField;
