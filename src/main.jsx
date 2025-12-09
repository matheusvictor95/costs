
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Company from './components/pages/Company.jsx'
import Contact from './components/pages/Contact.jsx'
import NewProject from './components/pages/NewProject.jsx'
import Projects from './components/pages/Projects.jsx'
import Home from './components/pages/Home.jsx'
import Project from './components/pages/Project.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Container from './components/layout/Container.jsx'
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <>
      <Navbar/>
     </>
      <Container customClass = "min-height">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/empresa" element={<Company/>}/>
          <Route path="/contato" element={<Contact/>}/>
          <Route path="/newproject" element={<NewProject/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/project/:id" element={<Project/>}/>
        </Routes>
      </Container>
      <Footer/>
  </BrowserRouter>,
)
