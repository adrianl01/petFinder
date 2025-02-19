import React from "react";
import { Link } from "react-router-dom";
import { useSearchResults } from "../../hooks";

export function SearchResultItem() {
  console.log("SearchResultItem");
  const data = useSearchResults();
  // const data = [
  //   {
  //     id: "1",
  //     thumbnail: "/thumb",
  //     title: "title1",
  //     price: 111,
  //   },
  //   {
  //     id: "2",
  //     thumbnail: "/thumb2",
  //     title: "title2",
  //     price: 222,
  //   },
  // ];
  return (
    <div>
      {data.map((r) => (
        <div
          className="main"
          id={r.id}
          style={{ backgroundColor: "light-green" }}
        >
          <img src={r.thumbnail} className="img" />
          <div>
            <Link to={"/item/" + r.id}>
              <h4 className="title">{r.title}</h4>
            </Link>
            <h4 className="price">{r.price}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
