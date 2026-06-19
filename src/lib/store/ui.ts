import { atom } from "recoil";

export const attentionCardAtom =
  atom<boolean>({
    key: "attentionCard",
    default: false,
  });

export const notificationDrawerAtom =
  atom<boolean>({
    key: "notificationDrawer",
    default: false,
  });