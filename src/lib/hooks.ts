// import useSWR from "swr";
// import useSWRImmutable from "swr";
// import { fetchAPI } from "./api";


// export async function useMe() {
//     const { data, error } = useSWR("/me", fetchAPI as any);
//     const res = await data ? data : null;
//     return res;
// }

// export async function useProducts(
//     query: string | undefined,
//     offset: string,
// ) {
//     if (query === "") {
//         return console.error({ message: "query vacío" })
//     } else if (query === "random") {
//         const { data, error } = useSWRImmutable(
//             `/search?search=${""}&limit=3&offset=${offset}`,
//             fetchAPI as any
//         );
//         const res = data ? data : null;
//         return res;
//     } else {
//         const { data, error } = useSWRImmutable(
//             `/search?search=${query}&limit=3&offset=${offset}`,
//             fetchAPI as any
//         );
//         const res = data ? data : null;
//         return res;
//     }
// }

// export function useProduct(productId: string) {
//     const { data, error } = useSWRImmutable(
//         "/products/" + productId,
//         fetchAPI as any
//     );
//     const res = data ? data : null;
//     return res;
// }
// export function useEmail() {
//     const { data, error } = useSWR("email",
//         () => {
//             return localStorage.getItem("email")
//         }
//     );
//     const res = data ? data : null;
//     return res;
// }


