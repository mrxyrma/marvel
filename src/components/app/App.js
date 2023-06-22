import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/SingleComicPage";

function App() {
  return ( 
    <BrowserRouter>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/comics" element={<ComicsPage />}/>
            <Route path="/comics/:comicId" element={<SingleComicPage />}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;