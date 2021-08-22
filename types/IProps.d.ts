// interface keyVal {
//   property: string;
// }

// interface IProps<T> extends T {
//   options?: string[];
//   value?: string;
//   disabledOptions?: string[];
//   defaultValue: string;
// }
import react from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  inputErrorMessage?: string;
  inputIconWrapper? : string;
}
