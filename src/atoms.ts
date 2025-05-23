import { atom, selector } from "recoil";
import { getTokenLS, getUserLocLS } from "./hooks";
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const tokenAtom = atom({
    key: "token",
    default: null
});
export const atentionCard = atom({
    key: "atentionCard",
    default: false
});
export const locationCoords = atom({
    key: "location",
    default: null
});
export const imgInfo = atom({
    key: "imgInfo",
    default: null
});
export const cloudinaryUrl = atom({
    key: "cloudinaryUrl",
    default: {}
});
export const userEmail = atom({
    key: "userEmail",
    default: null
});
export const userPassword = atom({
    key: "userPassword",
    default: null
});
export const longLatReport = atom({
    key: "longLatReport",
    default: null
});
export const longLatEditReport = atom({
    key: "longLatEditReport",
    default: null
});
export const newReportInfo = atom({
    key: "newReportInfo",
    default: null
});
export const repIdAtom = atom({
    key: "repId",
    default: null
});
export const userData = atom({
    key: "userData",
    default: null
});

export const repsByCoords = selector({
    key: 'repsByCoords',
    get: async ({ get }) => {
        const val = getUserLocLS();
        if (val) {
            const long = val[0];
            const lat = val[1];
            const res = await <any>fetch(apiUrl + 'reports?lat=' + lat + '&long=' + long + '&radius=' + '50000');
            const jsonRes = await res.json();
            return jsonRes;
        }
        else { return null };
    }
});
export const createUser = async (userData: any) => {
    const init: any = {};
    init.headers ||= {};
    init.headers["Content-type"] = "application/json";
    init.method = "POST";
    init.mode = "cors";
    init.body = JSON.stringify(userData)
    try {
        const res = await <any>fetch(apiUrl + 'auth', init)
        const jsonRes = await res.json();
        return jsonRes;
    }
    catch (e) {
        return console.error(e)
    }
};
export const getToken = async (data: { email: any; password: any; }) => {
    const valEmail = data.email
    const valPassword = data.password
    if (valPassword) {
        const init: any = {};
        init.headers ||= {};
        init.headers["Content-type"] = "application/json";
        init.method = "POST";
        init.mode = "cors";
        init.body = JSON.stringify({
            "email": valEmail,
            "password": valPassword
        })
        try {
            const res = await <any>fetch(apiUrl + 'auth/token', init)
            const jsonRes = await res.json();
            return localStorage.setItem("token", jsonRes.jwtRes)
        }
        catch (e) {
            return console.error(e)
        }
    }
};
export const getMyReps = selector({
    key: 'myReps',
    get: async ({ get }) => {
        const val = getTokenLS();
        console.log(val)
        if (val) {
            const init: any = {};
            init.headers ||= {};
            init.headers.Authorization = "Bearer " + val;
            init.headers["Content-type"] = "application/json";
            const res = await <any>fetch(apiUrl + 'me/reports', init);
            const myReps = await res.json();
            return myReps;
        }
        else { return null };
    }
});
export const createRep = selector({
    key: 'createRep',
    get: async ({ get }) => {
        const val = getTokenLS();
        if (!val) { return console.error("No hay token") }
        const newRep = get(newReportInfo)
        if (!newRep) { return console.error("No data") }
        console.log(newRep)
        console.log(val)
        const init: any = {};
        init.headers ||= {};
        init.headers.Authorization = "Bearer " + val;
        init.headers["Content-type"] = "application/json";
        init.method = "POST";
        init.mode = "cors";
        init.body = JSON.stringify(newRep);
        const res = await <any>fetch(apiUrl + 'reports', init);
        const newRepRes = await res.json();
        return newRepRes;
    }
});


export const uploadImage = async (imgInfoAtom) => {
    console.log(imgInfoAtom);
    let formData = new FormData();
    formData.append("file", imgInfoAtom);
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", process.env.CLOUDINARY_API_KEY);
    console.log(formData);
    try {
        if (imgInfoAtom !== null) {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const resJson = await res.json();
            return resJson.secure_url;
        };
    } catch (e) { console.log(e) };

};
export const getRepById = selector({
    key: 'getRepById',
    get: async ({ get }) => {
        const token = getTokenLS();
        const repId = get(repIdAtom);
        if (token) {
            const init: any = {};
            init.headers ||= {};
            init.headers.Authorization = "Bearer " + token;
            init.headers["Content-type"] = "application/json";
            const res = await <any>fetch(apiUrl + 'me/reports/' + repId, init);
            const myReps = await res.json();
            return myReps;
        }
        else { return null };
    }
});
export async function deleteRep(token: string, repId: string) {
    if (token) {
        const init: any = {};
        init.headers ||= {};
        init.headers.Authorization = "Bearer " + token;
        init.headers["Content-type"] = "application/json";
        init.method = "DELETE";
        const res = await <any>fetch(apiUrl + 'me/reports/' + repId, init);
        console.log(res)
        return res
    };
};
export async function updateRep(token: string, repId: string, data: any) {
    console.log(data)
    if (token) {
        const init: any = {};
        init.headers ||= {};
        init.headers.Authorization = "Bearer " + token;
        init.headers["Content-type"] = "application/json";
        init.method = "PATCH";
        init.body = JSON.stringify(data);
        const res = await <any>fetch(apiUrl + 'me/reports/' + repId, init);
        console.log(res)
        return res
    } else { return { message: "No token was Found" } };
};
export async function sendEmailReport(data: any) {
    console.log(data)
    if (data.email) {
        const init: any = {};
        init.headers ||= {};
        init.headers["Content-type"] = "application/json";
        init.method = "POST";
        init.body = JSON.stringify(data);
        const res = await <any>fetch(apiUrl + 'sight');
        console.log(res)
        return res
    } else { return { message: "No token was Found" } };
};

