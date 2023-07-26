import React, { useEffect } from "react";

const BotCollection = () => {
  useEffect(() => {
    fetch(`http://localhost:4000/bots`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
  return <div>BotCollection</div>;
};

export default BotCollection;
