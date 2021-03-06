import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  errors,
  onChange,
  icon,
  type
}) => {
  return (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className='input-group-text'>
                <i className={icon}/>
            </span>
        </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors && <div className="invalid-feedback"> {errors}</div>}
    </div>
  );
};

InputGroup.propTypes=
{
    name:propTypes.string.isRequired,
    placeholder:propTypes.string,
    value:propTypes.string.isRequired,
    icon:propTypes.string,
    errors:propTypes.string,
    type:propTypes.string.isRequired,
    onChange:propTypes.func.isRequired,
}

InputGroup.defaultProps={
    type:'text'
}

export default InputGroup;
