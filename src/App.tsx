import React, { useState } from "react";

export function App() {
  // const [results, setResults] = useState([]);
  // const handlerSearch = async (search) => {
  //   console.log(search);
  //   const res = await fetch(
  //     "https://api.mercadolibre.com/sites/MLA/search?q=" + search
  //   );
  //   const data = await res.json();
  //   setResults(data.results);
  // };

  return (
    <div className="container">
      {/* {results.map((item) => (
        <SearchResultItem
          id={item.id}
          title={item.title}
          price={item.price}
          imgUrl={item.thumbnail}
        />
      ))} */}
    </div>
  );
}
