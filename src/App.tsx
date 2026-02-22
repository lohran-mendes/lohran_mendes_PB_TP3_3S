import "./App.css";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main>
        <h1>Nome do Curso</h1>
      </main>
    </div>
  );
}

export default App;
