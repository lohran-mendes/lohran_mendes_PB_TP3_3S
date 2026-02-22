import { Sidebar } from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main>
        <h1>Nome do Curso</h1>
      </main>
    </div>
  );
}

export default App;
