import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/test")
      .then((res) => setMsg(res.data.message))
      .catch((err) => {
        console.error(err);
        setMsg("Error connecting to backend");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{msg}</h2>
    </div>
  );
}

export default App;
