
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Company from './components/pages/Company.jsx'
import Contact from './components/pages/Contact.jsx'
import NewProject from './components/pages/NewProject.jsx'
import Home from './components/pages/Home.jsx'
import { BrowserRouter, Route, Routes, Link } from 'react-router'
import Container from './components/layout/Container.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <>
        <Link to="/">Home</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/empresa">Empresa</Link>
        <Link to="/novoprojeto">Novo Projeto</Link>
     </>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/empresa" element={<Company/>}/>
          <Route path="/contato" element={<Contact/>}/>
          <Route path="/novoprojeto" element={<NewProject/>}/>
        </Routes>
      </Container>
  </BrowserRouter>,
)
