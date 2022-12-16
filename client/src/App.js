import "./App.css";
import Home from "./question/home";
import Question from "./question/Question";
import Result from "./question/Result";
import { Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Map from "./map/map";
import Header from "./header";

//test
import Map2 from "./map/map2";
import Map3 from "./map/map3";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/FoodTest" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
        <Route path="/map" element={<Map />} />
        <Route path="/map2" element={<Map2 />} />
        <Route path="/map3" element={<Map3 />} />
      </Routes>
    </>
  );
}

export default App;
