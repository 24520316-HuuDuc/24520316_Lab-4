
function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        className={error ? "input-error" : ""}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />

      {error && (
        <span className="error-message">{error}</span>
      )}
    </div>
  );
}

export default InputField;
