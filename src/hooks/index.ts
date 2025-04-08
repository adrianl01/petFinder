import { getMyReps, getRepById, repIdAtom, repsByCoords, userEmail } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil"

// export function getUserEmail() {
//     const emailAtom = useRecoilValue(userEmail);
//     return emailAtom;
// };

export function getRepsByCoords() {
    const repsRes = useRecoilValue(repsByCoords);
    return repsRes;
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

export function getEmailLS() {
    return localStorage.getItem("email")
}
export function getTokenLS() {
    return localStorage.getItem("token")
}
export function getUserLocLS() {
    const loc = localStorage.getItem("userLocation")
    return JSON.parse(loc)
}

