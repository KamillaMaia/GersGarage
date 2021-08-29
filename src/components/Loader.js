import React, {useState, useEffect} from "react";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
 
  return (
    <div style={{margintop:"150px"}}>
      <div className="sweet-loading text-center">
        <RingLoader color="#000" loading={loading} css="" size={90} />
      </div>
    </div>
  );
}

export default Loader;
