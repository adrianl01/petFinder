// import { useEmail } from "./hooks";
import { getEmail, retrieveToken, saveEmail, saveToken } from "./index";
const API_URL = process.env.NEXT_PUBLIC_API_URL
console.log(API_URL)
//   process.env.NODE_ENV !== "development"
//     ? process.env.NEXT_PUBLIC_API_URL
//     : "http://localhost:3001/api";

export type userData = {
    firstName: string,
    lastName: string,
    userAge: number,
    phoneNumber: number
}

export type signInData = {
    email: string, password: string
}


export async function fetchAPI(param: RequestInfo, option: RequestInit) {
    const token = retrieveToken();
    const init: any = option || {};
    if (token) {
        init.headers ||= {};
        init.headers.Authorization = "Bearer " + token;
        init.headers["Content-type"] = "application/json";
    }
    const res = await fetch((API_URL as string) + param, init);

    if (res.status >= 200 && res.status < 300) try {
        return res.json();
    } catch (e) {
        console.log(e)
        throw {
            message: "An error has ocurred",
            status: res.status,
        };
    }
}

export async function signUp(email: string) {
    console.log({ email });
    saveEmail(email);
    return await fetchAPI("/auth", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
    }).catch((e) => {
        console.error(e);
    });
}

export async function signIn(signInData: signInData) {
    const { email, password } = signInData
    saveEmail(email)
    console.log(email, password, "from signIn");

    const data = await fetchAPI("/auth/token", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    console.log(data);
    // saveToken(data.token);
    // return data;
}

export async function getUser() {
    return await fetchAPI("/me", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
    });
}
export async function updateUser(additionalUserData: userData) {
    return await fetchAPI("/me", {
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ additionalUserData }),
    });
}

export async function updateAddress(address: string) {
    return await fetchAPI("/me/address", {
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ address }),
    });
}

export async function useBuyProduct(id: string) {
    const res = await fetchAPI("/order/?productId=" + id, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        // body: JSON.stringify({}),
    })
    return res
}


// export async function generateOrder(
//   address: string,
//   products: shoppingCartItem[]
// ) {
//   console.log(address);

//   return await fetchAPI(`/order`, {
//     method: "POST",
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       envio: address,
//       products,
//     }),
//   });
// }

// export async function SearchProducts() {
//     return await fetchAPI(`/products/`, {
//         mode: "cors",
//         headers: {
//             "Content-type": "application/json",
//         },
//     });
// }
// export async function sync() {
//   return await fetchAPI(`/sync`, {
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
// }

// export async function getProductByID(productId: string) {
//   return await fetchAPI("/products/" + productId, {
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
// }

// export async function getFavourites() {
//   return await fetchAPI("/me/favourites", {
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
// }

// export async function setNewFavourite(product: favouriteItems) {
//   return await fetchAPI("/me/favourites", {
//     method: "PATCH",
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       product,
//     }),
//   });
// }

// export async function deleteFavourite(itemId: string) {
//   return await fetchAPI("/me/favourites?productId=" + itemId, {
//     method: "DELETE",
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
// }

// export async function getShoppingCart() {
//   return await fetchAPI("/me/shopping-cart", {
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
// }
// export async function addProductToCart(product: shoppingCartItem) {
//   return await fetchAPI("/me/shopping-cart", {
//     method: "PATCH",
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       product,
//     }),
//   });
// }
// export async function deleteItemFromCart(itemId: string) {
//   return await fetchAPI("/me/shopping-cart?productId=" + itemId, {
//     method: "DELETE",
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
// }

// export async function getProductsByGenre(genre: Genre, offset = 20) {
//   return await fetchAPI(
//     "/products/genre?genre=" + genre + "&offset=" + offset,
//     {
//       mode: "cors",
//       headers: {
//         "Content-type": "application/json",
//       },
//     }
//   );
// }