import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState("");
  const [formData, setFormData] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/all").then(
      (res) => {
        let message = res.data.message;
        setState(message);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new URLSearchParams();
      data.append("content", formData);
      const result = await axios.post("http://localhost:4000/test/post", data);
      console.log(formData);
      if (result) {
        if (result.status === 200) {
          console.log("save ok", result);
        }
      }
    } catch (err) {
      console.log(err);
      alert("test that bai");
    }
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Test Database</p>
        <form onSubmit={handleSubmit}>
          <label>
            Tên mày là gì:
            <input
              type="text"
              name="content"
              value={formData}
              onChange={handleChange}
            ></input>
          </label>
          <button type="submit">Submit</button>
        </form>
        <p>{formData}</p>
        <div className="App">
          <h1>Front end</h1>
          <p>Message from backend: </p>
          <p>{state}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
