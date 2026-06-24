import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState([]);

  const login = () => {
    if (username.trim() !== "") {
      setLoggedIn(true);
    }
  };

  const generateSummary = async () => {
  const res = await fetch(`http://127.0.0.1:8000/summary?topic=${topic}`);
  const data = await res.json();
  setSummary(data.summary);
};

  const generateQuiz = async () => {
  const res = await fetch(`http://127.0.0.1:8000/quiz?topic=${topic}`);
  const data = await res.json();

  setQuiz(
    data.questions.map((q) => ({
      question: q,
      options: ["A", "B", "C", "D"],
    }))
  );
};

  if (!loggedIn) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Smart Learning Platform</h1>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome {username}</h1>

      <input
        type="text"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <br /><br />

      <button onClick={generateSummary}>
        Generate Summary
      </button>

      <button
        onClick={generateQuiz}
        style={{ marginLeft: "10px" }}
      >
        Generate Quiz
      </button>

      <h2>Summary</h2>
      <p>{summary}</p>

      <h2>Quiz</h2>

      {quiz.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>

          {q.options.map((option, i) => (
            <button key={i}>{option}</button>
          ))}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;