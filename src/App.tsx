import BaseLayout from "./layouts/index";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsDetail from "./pages/NewsDetail";
import NewsIndex from "./pages/NewsIndex";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<NewsIndex />}></Route>
            <Route path="/posts/:id" element={<NewsDetail />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
