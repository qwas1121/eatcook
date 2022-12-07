import React from "react";

const Crawling = ({ item }) => {
  const { title, link } = item;

  return (
    <a href={link} target="_blank">
      {title}
    </a>
  );
};
export default Crawling;
