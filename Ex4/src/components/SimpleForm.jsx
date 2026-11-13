
import { useState } from "react";
import InputField from "./InputField";

const initialValues = {
  name: "",
  email: "",
  password: ""
};

// Pure function: validate dựa trên dữ liệu hiện tại
function validateForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }

  return errors;
}

function SimpleForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Derive validation directly; không cần useEffect
  const errors = validateForm(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(name, value) {
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value
    }));

    setSuccessMessage("");
  }

  function handleBlur(name) {
    setTouched((previousTouched) => ({
      ...previousTouched,
      [name]: true
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) {
      return;
    }

    setSuccessMessage("Registration completed successfully!");
  }

  function handleReset() {
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
    setSuccessMessage("");
  }

  function getError(name) {
    return (touched[name] || submitted) ? errors[name] : "";
  }

  return (
    <section className="form-card">
      <div className="form-heading">
        <span className="form-tag">EXERCISE 1.6</span>
        <h2>Registration Form</h2>
        <p>Legacy Validation Refactoring</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Full Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getError("name")}
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getError("email")}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getError("password")}
        />

        <div className="form-status">
          <span className={isValid ? "status-valid" : "status-invalid"}>
            {isValid ? "All fields are valid" : "Please complete all fields correctly"}
          </span>
        </div>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit
          </button>

          <button
            type="button"
            className="reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default SimpleForm;
