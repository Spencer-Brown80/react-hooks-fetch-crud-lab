import React from "react";

function QuestionItem({ question, deleteItem }) {
  const { id, prompt, answers, correctIndex } = question;

  // Check if answers is an array, if not, set it to an empty array
  const options = Array.isArray(answers)
    ? answers.map((answer, index) => (
        <option key={index} value={index}>
          {answer}
        </option>
      ))
    : null;

  //Deletes item from the db.json
  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error deleting question");
        }
      })
      // Call deleteItem if DELETE request was successful
      .then(() => deleteItem(question.id))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;