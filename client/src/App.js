import "./App.css";
import Question from "./question/Question";
import Result from "./question/Result";
import ResultNo from "./question/ResultNo";
import { Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Header from "./header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
        <Route path="/resultNo" element={<ResultNo />} />
      </Routes>
    </>
  );
}

export default App;
