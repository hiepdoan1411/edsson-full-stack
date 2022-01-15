import React, { FC, useState } from "react";

type Props = {
  id: string;
  label: string;
  name: string;
  type: "text" | "number";
  onHasError: (error: boolean) => void;
  maxLength?: number;
};

// function wait(milliseconds: number) {
//   const start = new Date().getTime();
//   while (new Date().getTime() - start < milliseconds) {}
// }
const FormInput: FC<Props> = ({
  id,
  label,
  name,
  type,
  maxLength,
  onHasError,
}: Props) => {
  // This component is a bit slow to render...
  //   wait(25);
  const [errorMessage, setErrorMessage] = useState<string>();

  const onInput = (input: string) => {
    let hasError = false;
    switch (type) {
      case "text":
        if (input.length > (maxLength as number)) {
          setErrorMessage(`Maximum input length of ${maxLength} characters`);
          hasError = true;
        } else {
          setErrorMessage("");
          hasError = false;
        }
        break;
      case "number":
        if (isNaN(Number(input))) {
          setErrorMessage(`Must be number`);
          hasError = true;
        } else {
          setErrorMessage("");
          hasError = false;
        }
        break;
    }
    onHasError(hasError);
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          type="text"
          id={id}
          name={name}
          onInput={(e) => onInput(e.currentTarget.value)}
        />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default FormInput;
