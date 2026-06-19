import { atom } from "recoil";

export interface SelectedLocation {
  lat: number;
  lng: number;
}

export const selectedReportLocationAtom =
  atom<SelectedLocation | null>({
    key: "selectedReportLocation",
    default: null,
  });

export const selectedReportAtom =
  atom<string | null>({
    key: "selectedReport",
    default: null,
  });