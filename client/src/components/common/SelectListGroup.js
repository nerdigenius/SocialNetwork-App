import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const SelectListGroup = ({
  name,
  value,
  errors,
  info,
  onChange,
  options
}) => {
    const selectOptions = options.map(option=>(
        <option key={options.label} value={option.value}>{option.label}</option>
    ))
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
          {selectOptions}
      </select>
      {info && <small className="form-text text-muted"> {info}</small>}
      {errors && <div className="invalid-feedback"> {errors}</div>}
    </div>
  );
};

SelectListGroup.propTypes=
{
    name:propTypes.string.isRequired,
    value:propTypes.string.isRequired,
    info:propTypes.string,
    error:propTypes.string,
    onChange:propTypes.func.isRequired,
    options:propTypes.array.isRequired
}



export default SelectListGroup;
