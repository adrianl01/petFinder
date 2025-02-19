import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchResults } from "../hooks";
import { MainButton } from "../ui/buttons";
import { SearchInput } from "../ui/text-field";

export function SearchForm() {
  console.log("SearchForm");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.query.value;
    navigate("/search/" + query, { replace: true });
    console.log(query);
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <SearchInput name={"query"} />
      <MainButton>Buscar</MainButton>
    </form>
  );
}
