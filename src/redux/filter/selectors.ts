import { RootState } from "../store";

export const selectFilter = ((store:RootState) => store.filter)