import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [validInput, setValidInput] = useState(false);

  useEffect(() => {
    const validateJSON = () => {
      try {
        const parsedData = JSON.parse(inputValue);
        if (!Array.isArray(parsedData.data)) {
          setError("Invalid input: 'data' must be an array");
          setValidInput(false);
          return;
        }
        setError("");
        setValidInput(true);
      } catch {
        setError("Invalid JSON format");
        setValidInput(false);
      }
    };

    validateJSON();
  }, [inputValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validInput) return;

    try {
      const response = await fetch("https://bajaj-finserv-task-fkky.onrender.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: inputValue,
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Failed to fetch data from the server");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Bajaj Finserv Task</h1>

      <form className="form" onSubmit={handleSubmit}>
        <textarea
          className={`textarea ${error ? "textarea-error" : ""}`}
          rows="6"
          cols="50"
          placeholder='Enter JSON input like: {"data":["A","1","c"]}'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
        {error && <p className="error-message">{error}</p>}
        <button
          type="submit"
          className={`submit-button ${!validInput ? "button-disabled" : ""}`}
          disabled={!validInput}
        >
          Submit
        </button>
      </form>

      {response && (
        <div className="response-box">
          <h3>Response:</h3>
          <pre className="response-content">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
