import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  )
}

class App extends Component {
    render() {
      const FILE_SIZE = 160 * 1024;
      const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
      ];
      const validationSchema = yup.object().shape({
        text: yup.string().required("A text is required"),
        file: yup
          .mixed()
          .required("A file is required")
          .test(
            "fileSize",
            "File too large",
            value => value && value.size <= FILE_SIZE
          )
          .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
          )
      });