import "./App.css";
import Home from "./question/home";
import Question from "./question/Question";
import Result from "./question/Result";
import { Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import MapPop from "./map/mapPop";
import Map2 from "./map/map2";
import Header from "./header";

//test
import Question2 from "./question/test";

import MapContainer from "./map/SearchPlace";
import Like from "./question/like";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/FoodTest" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/result" element={<Result />} />
        <Route path="/map" element={<MapPop />} />
        <Route path="/map2" element={<Map2 />} />

        <Route path="/mapt" element={<MapContainer />} />

        <Route path="/like" element={<Like />} />
      </Routes>
    </>
  );
}

export default App;
