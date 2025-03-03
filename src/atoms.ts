import { atom, selector } from "recoil";
import { useGeocodingCore } from "@mapbox/search-js-react";

export const queryState = atom({
    key: "query",
    default: null
})
export const locationCoords = atom({
    key: "location",
    default: null
})
export const geoSearchAtom = atom({
    key: "geoCode",
    default: ""
})
export const imgInfoAtom = atom({
    key: "imgInfo",
    default: {}
})

export const userEmail = atom({
    key: "userEmail",
    default: null
})
export const longLatReport = atom({
    key: "longLatReport",
    default: null
})

export const resultsState = selector({
    key: 'geoSearch',
    get: async ({ get }) => {
        // const user = get(userState);
        console.log("apiRes")
        const val = get(geoSearchAtom)
        if (val) {
            const res = await <any>fetch("https://api.mapbox.com/search/geocode/v6/forward?q=" + val + "&" + "access_token=pk.eyJ1IjoiYWRyaWFubGVpdmExIiwiYSI6ImNsdW5qOTBmYzFubmMydm8xNzd1aGM0MzUifQ.XKlAT89VnNSAFVho6Ztetw")
            const data = await res.json();
            // console.log(data.features[0].map((d) => {
            //     console.log(d.properties.full_address)
            // }))
            console.log(data.features[0].properties.coordinates)
            return data.features[0].properties.coordinates;
        } else { return null }
    }
})
export const resLocation = selector({
    key: 'resLocation',
    get: async ({ get }) => {
        // const user = get(userState);
        const val = get(geoSearchAtom)
        if (val) {
            console.log("selector val", val)
            const geocodingCore = await useGeocodingCore({ accessToken: "pk.eyJ1IjoiYWRyaWFubGVpdmExIiwiYSI6ImNsdW5qOTBmYzFubmMydm8xNzd1aGM0MzUifQ.XKlAT89VnNSAFVho6Ztetw" });
            const response = await geocodingCore.forward(val, {
                limit: 1
            });
            console.log("response", response);
            return await response
        } else { return [] }
    }
})
export const longLatGeoCoding = selector({
    key: 'charCountState',
    get: async ({ get }) => {
        // const user = get(userState);
        console.log("apiRes")
        const val = get(longLatReport)
        if (val) {
            //     const res = await <any>fetch("https://api.mapbox.com/search/geocode/v6/reverse?longitude="+val.+"&latitude={latitude}" + "&" + "access_token=pk.eyJ1IjoiYWRyaWFubGVpdmExIiwiYSI6ImNsdW5qOTBmYzFubmMydm8xNzd1aGM0MzUifQ.XKlAT89VnNSAFVho6Ztetw")
            //     const data = await res.json();
            //     // console.log(data.features[0].map((d) => {
            //     //     console.log(d.properties.full_address)
            //     // }))
            //     console.log(data.features[0].properties.coordinates)
            //     return data.features[0].properties.coordinates;
            return "ok"
        } else { return null }
    }
})
