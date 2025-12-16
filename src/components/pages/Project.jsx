import { useEffect, useState } from 'react';
import styles from './styles/Project.module.css';
import { useParams } from 'react-router';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Loading from '../layout/Loading';
import Message from '../layout/Message';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

   useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json())
      .then((data) => {
        setProject(data);
      })
      .catch((err) => console.log(err));
      }, [id])

      function toggleProjectForm () {
        setShowProjectForm(!showProjectForm);
      }

      function editPost (project) {
        if(project.budget < project.cost){
         setMessage('O orçamento não pode ser menor que o custo do projeto!');
          setType('error');
          return false;
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
          method: "PATCH",
          headers: {  "Content-Type": "application/json", },
          body: JSON.stringify(project),
        })
        .then().then((data) => {setProject(data),setShowProjectForm(false),setMessage('Projeto Atualizado!'),setType('sucess')}).catch((err) => console.log(err));
      }

    return (
      <>
   {project.name ? (
    <div className={styles.project_details}>
    <Container customClass="column">
      {message && <Message type={type} msg={message}/>}
    <div className={styles.details_container}>
      <h1>Projeto: {project.name}</h1>
      <button onClick={toggleProjectForm} className={styles.btn}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
      {!showProjectForm ? (
        <div className={styles.project_info}>
          <p>
            <span>Categoria:</span> {project.category?.name}
          </p>
          <p>
            <span>Orçamento: </span> R${project.budget}
          </p>
            <p>
            <span>Total Utilizado: </span> R${project.cost}
          </p>
        </div>
      ) : (
        <div className={styles.project_info}>
          <ProjectForm handleSubmit={editPost} btnText="Editar" projectData={project}/>
           </div>
      )}
    </div>
    </Container>
    </div>
   ) : (
    <Loading/>
   )}
  </>
    );
}

export default Project;