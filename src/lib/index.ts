// import { useProduct, useProducts } from "./hooks";

export function saveToken(token: string) {
    localStorage.setItem("token", JSON.stringify(token));
}

export function retrieveToken() {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token") || "";
        if (!token) return;
        return JSON.parse(token);
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    return { message: "Logged Out" }
}

export function saveEmail(email: string) {
    localStorage.setItem("email", email);
}

export function getEmail() {
    const email = localStorage.getItem("email");
    return email;
}
export function saveCoords(coords: string) {
    localStorage.setItem("coords", coords);

}
export function getCoords() {
    const coords = localStorage.getItem("coords");
    return coords;
}

//   export function saveUserDataOnLS(data: UserStorageData) {
//     localStorage.setItem("user", JSON.stringify(data));
//   }

export function getUserDataFromLS() {
    if (typeof window !== undefined) {
        const userDataLS = localStorage.getItem("user") || "";
        if (!userDataLS) return;
        return JSON.parse(userDataLS);
    }
}

export function isUserLogged() {
    const token = retrieveToken();
    return !(token == null);
}
export function getUsername() {
    return getUserDataFromLS()?.username;
}
export function getUserAddress() {
    return getUserDataFromLS()?.address;
}

// export async function searchProducts(q: string, offset: string) {
//     const data = await useProducts(q, offset)
//     const res = await data
//     return res
// }
// export async function getProductbyId(q: any) {
//     const data = await useProduct(q)
//     const res = await data
//     return res
// }