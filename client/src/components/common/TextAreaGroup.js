import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextAreaGroup = ({
  name,
  placeholder,
  value,
  errors,
  info,
  onChange,
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted"> {info}</small>}
      {errors && <div className="invalid-feedback"> {errors}</div>}
    </div>
  );
};

TextAreaGroup.propTypes=
{
    name:propTypes.string.isRequired,
    placeholder:propTypes.string,
    value:propTypes.string.isRequired,
    info:propTypes.string,
    error:propTypes.string,
    onChange:propTypes.func.isRequired,
}



export default TextAreaGroup;
