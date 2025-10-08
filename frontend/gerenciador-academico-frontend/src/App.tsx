import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="d-flex flex-column" style={{minHeight: "100vh"}}>
      <Header />
      <main className="container flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default App