import React, { useState }  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Movie from "./Pages/MovieDetail/Movie";
import Popular from "./Pages/Popular";
import TopRated from "./Pages/TopRated";
import Upcoming from "./Pages/Upcoming";
import SearchResults from "./Pages/SearchResults/SearchResults";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  return (
    <Router>
      <Header onSearch={setSearchTerm} onFilter={setSelectedGenre}/>
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/movie/popular" element={<Popular />} />
        <Route path="/movie/top_rated" element={<TopRated />} />
        <Route path="/movie/upcoming" element={<Upcoming />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
