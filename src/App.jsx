import { Routes, Route } from "react-router-dom"
import  home  from "./pages/home"

function App() {


  return (
    <Routes>
      <Route path="/" Component={home} />
    </Routes>
  )
}

export default App
