import React, { Fragment, useState } from "react";
import { Input } from "antd";
import MovieCard from "../map/crawling";
import axios from "axios";
const { Search } = Input;

const SearchTest = () => {
  const [query, setQuery] = useState("목동");
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const [items, setItems] = useState();

  const handleButton = async () => {
    try {
      const res = await axios.get("http://localhost:3001/naver/", {
        params: {
          query: query,
        },
      });
      if (res && res.status === 200) {
        const { data } = res;
        console.log(data);
        setItems(data.items);
      }
    } catch (e) {
      console.log("error ", e);
    }
  };

  return (
    <Fragment>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <Search
          placeholder="영화를 검색해 보세요!"
          onSearch={(value) => console.log(value)}
          onChange={handleQuery}
          onClick={handleButton}
          style={{ width: 200 }}
        />
      </div>
      <div>
        {items &&
          items.map((item) => {
            item.title = item.title.replace(/<b>/g, "");
            item.title = item.title.replace(/<\/b>/g, "");
            return <MovieCard item={item}></MovieCard>;
          })}
      </div>
    </Fragment>
  );
};

export default SearchTest;
