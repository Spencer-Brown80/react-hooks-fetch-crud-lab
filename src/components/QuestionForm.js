import React, { useState } from "react";

function QuestionForm({ addItem }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""], // Initialize answers as an array
    correctIndex: 0,
  });

  function handleChange(event, index) {
    const newAnswers = [...formData.answers];
    newAnswers[index] = event.target.value;

    setFormData({
      ...formData,
      answers: newAnswers,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:4000/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Oops, something went wrong");
        }
      })
      .then((data) => {
        addItem(data);
      });

    console.log(formData);
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={(event) =>
              setFormData({ ...formData, prompt: event.target.value })
            }
          />
        </label>
        {[0, 1, 2, 3].map((index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              value={formData.answers[index]}
              onChange={(event) => handleChange(event, index)}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={(event) =>
              setFormData({ ...formData, correctIndex: event.target.value })
            }
          >
            {[0, 1, 2, 3].map((index) => (
              <option key={index} value={index}>
                Answer {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
