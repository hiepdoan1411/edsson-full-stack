import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchData } from "./api";
import { selectDefinition, setDefinition } from "./slice";

const Definition: FC = () => {
  const state = useAppSelector(selectDefinition);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      const response = await fetchData();
      if (response) {
        dispatch(setDefinition(response));
      }
    }
    init();
  }, [dispatch]);

  return <div>{state && JSON.stringify(state)}</div>;
};

export default Definition;
