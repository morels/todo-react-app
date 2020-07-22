import React from "react";

const Sum = ({ items }) => (
  <div>{items && items.reduce((sum, item) => sum + item.price, 0)} &euro;</div>
);

export default Sum;
