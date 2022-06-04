import { useEffect, useState } from "react";

function Nordnet() {
  let [timestamp, setTimestamp] = useState();
  let data = "alexander";

  const encode = Buffer.from(data).toString("base64");
  const decode = Buffer.from(encode, "base64").toString("utf-8");

  useEffect(() => {
    setTimestamp(Date.now());
  });

  //   const encodedTimestamp = Buffer.from(timestamp).toString("base64");

  return (
    <div className="content">
      <p className="content">data: {data}</p>
      <p className="content">encoded: {encode}</p>
      <p className="content">decoded: {decode}</p>

      <p className="content">{timestamp}</p>
    </div>
  );
}

export default Nordnet;
