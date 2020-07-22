import React from "react";

const TotalAmount = ({ items }) => (
  <div>
    {items && items.reduce((sum, item) => sum + (item.price - 0), 0)} &euro;
  </div>
);

export default TotalAmount;
