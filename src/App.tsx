import "./App.css";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { CourseCard } from "./components/CourseCard";

function App() {
  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main>
        <h1>UX design</h1>
        <p>Design as a profession</p>
        <div className="course-cards-list">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
        <p>Design process. Main stages</p>
        <div className="course-cards-list">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </main>
    </div>
  );
}

export default App;
