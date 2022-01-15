import React, { FC, useEffect, FormEvent, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchData, saveDocument } from "./api";
import FormInput from "./Input";
import { selectDefinition, setDefinition } from "./slice";

const Definition: FC = () => {
  const state = useAppSelector(selectDefinition);
  const dispatch = useAppDispatch();
  const [hasError, setHasError] = useState(false);

  const onHandleErrorMessage = (error: boolean) => {
    setHasError(error);
  };

  useEffect(() => {
    async function init() {
      const response = await fetchData();
      if (response) {
        dispatch(setDefinition(response));
      }
    }
    init();
  }, [dispatch]);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasError) {
      console.log("Validation error!");
    } else {
      await saveDocument(
        Object.fromEntries(new FormData(e.currentTarget).entries())
      );
    }
  };

  return state.documents ? (
    <form onSubmit={submitForm}>
      {state.rowsA[0]?.columns.map((column: any) => {
        const definition = state.documents.find(
          (item) => item._id === column.fieldId
        );
        return (
          definition && (
            <FormInput
              key={definition._id}
              id={definition._id}
              name={definition.name}
              label={definition.label}
              type={definition.type}
              onHasError={onHandleErrorMessage}
              maxLength={Number(definition.maxLength)}
            />
            // <div>cac</div>
          )
        );
      })}
      <button type="submit">Create</button>
    </form>
  ) : null;
};

export default Definition;
