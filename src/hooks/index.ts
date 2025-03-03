import { useEffect } from "react";
import { resultsState, queryState, locationCoords, resLocation, geoSearchAtom, userEmail } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useParams } from "react-router-dom";

export function useSearchResults() {
    const params = useParams();
    const query = params.query

    const setQuery = useSetRecoilState(queryState)
    const results = useRecoilValue(resultsState)

    useEffect(() => {
        if (query) { setQuery(query) }
    }, [query]);
    return results
}

export function setLoc(loc?) {
    console.log("loc", loc)
    const setLocation = useSetRecoilState(locationCoords);
    setLocation(loc);
}

export function geoCode() {
    console.log("geoCode")
    const resLoc = useRecoilValue(resultsState)
    return resLoc
}

export function logInCheck() {
    console.log("logInCheck")
    const emailAtom = useRecoilValue(userEmail)
    console.log("emailAtom:", emailAtom)
    return emailAtom
}


