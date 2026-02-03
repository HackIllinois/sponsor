
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./components/Page";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { ResumeBook } from "./routes/ResumeBook";
import { DownloadPage } from "./routes/DownloadPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page showNav={true} pageContent={<Home />} />} />
        <Route path="/resume-book" element={<ResumeBook />} />
        <Route path="/resume-book/:resumeId?" element={<ResumeBook />} />
        <Route path="/login" element={<Page showNav={true} pageContent={<Login />} />} />
        <Route path="/resume-book/download/:resumeId" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
