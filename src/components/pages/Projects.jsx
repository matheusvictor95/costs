import Message from "../layout/Message";
import { data, useLocation } from "react-router";
import Container from "../layout/Container";
import styles from "./styles/Projects.module.css";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";

function Projects() {

  const [projects, setProjects] = useState([]);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((resp) => resp.json()).then((data) => {
      setProjects(data);
  }).catch((err) => console.log(err))
    }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" text={message} />}
      <Container customClass="start">
        {if(projects.lenght == 0){
          <p>Não há projetos cadastrados.</p>
        } else {
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
            />
          ))
       }}
      </Container>
    </div>
  );
}

export default Projects;
