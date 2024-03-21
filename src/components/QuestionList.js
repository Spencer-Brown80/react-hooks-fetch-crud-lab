import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questionList, deleteItem }) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {
      questionList.map(question => (
      <QuestionItem 
        question={question}
        deleteItem={deleteItem} 
        key={question.id} />)
      )}
        </ul>
    </section>
  );
}

export default QuestionList;
