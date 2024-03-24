import "./SearchBar.css"

import { FaMagnifyingGlass } from "react-icons/fa6";

interface ISearchBar {
}

export default function SearchBar(props:ISearchBar) {
  return (
    <div className="SearchBar col-lg-5 mx-auto w-50">
      <div className="input-group">
        <input className="form-control border-end-0 border rounded-3" type="search" id="header-search-input" />
        <span className="input-group-append">
          <button style={{ marginLeft: '-41px' }} className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-3" type="button">
            <FaMagnifyingGlass />
          </button>
        </span>
      </div>
    </div>
  );
};
