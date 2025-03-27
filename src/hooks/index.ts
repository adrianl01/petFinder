import { deleteRep, getMyReps, getRepById, getToken, locationCoords, repIdAtom, repsByCoords, tokenAtom, uploadImage, userEmail, userPassword } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil"

export function getUserEmail() {
    const emailAtom = useRecoilValue(userEmail);
    return emailAtom;
};

export function getRepsByCoords() {
    const repsRes = useRecoilValue(repsByCoords);
    return repsRes;
};

export function getUserToken() {
    const getUserToken = useRecoilValue(getToken);
    return getUserToken
};

export function getUserReps() {
    const getUserReps = useRecoilValue(getMyReps);
    return getUserReps
};
export function getRepByIdFunc(id: string) {
    const setRepId = useSetRecoilState(repIdAtom);
    setRepId(id);
    const repByIdRes = useRecoilValue(getRepById);
    return repByIdRes
};


