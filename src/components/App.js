import React, { useState,  useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        console.error('error')
      }
    })
    .then(data => setQuestionList(data))
  }, [])

  const addItem = (newItem) => {
    setQuestionList([...questionList, newItem])
  }

  const deleteItem = (id) => {
    //filter item out of state 
    setQuestionList(questionList.filter(item => {
      //if current item does not have matching id
      //keep current item
      if(item.id !== id){
        return true 
      } else {
        return false
      }
      
    }))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addItem={addItem}/> : <QuestionList deleteItem={deleteItem} questionList={questionList}/>}
    </main>
  );
}

export default App;
