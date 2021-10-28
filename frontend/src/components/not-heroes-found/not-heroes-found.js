import React from "react";

import { AiOutlineSearch } from "react-icons/ai";

const NotHeroesFound = () => {
  return (
    <div className="p-relative text-center m-3">
      <AiOutlineSearch size="25%" className="m-auto" />
      <div className="fs-4">No se encontraron héroes</div>
    </div>
  );
};

export default NotHeroesFound;
