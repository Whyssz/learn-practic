import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { githubActions } from "../API/github.slice";

const actions = {
  ...githubActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};