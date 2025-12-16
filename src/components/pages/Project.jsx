import { useEffect, useState } from 'react'
import styles from './styles/Project.module.css'
import { useParams } from 'react-router'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Loading from '../layout/Loading'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import { v4 as uuidv4 } from 'uuid'

function Project() {
  const { id } = useParams()

  const [project, setProject] = useState(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`)
      .then((resp) => resp.json())
      .then((data) => setProject(data))
      .catch((err) => console.log(err))
  }, [id])

  function createService(updatedProject) {
    setMessage('')

    const services = updatedProject.services || []
    const lastService = services[services.length - 1]

    const newService = { ...lastService, id: uuidv4() }

    const newCost =
      Number(updatedProject.cost) + Number(newService.cost)

    if (newCost > Number(updatedProject.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
      setType('error')
      return
    }

    const projectToUpdate = {
      ...updatedProject,
      cost: newCost,
      services: [...services.slice(0, -1), newService],
    }

    fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectToUpdate),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowServiceForm(false)
        setMessage('Serviço adicionado com sucesso!')
        setType('success')
      })
      .catch((err) => console.log(err))
  }

  function editPost(updatedProject) {
    setMessage('')

    const budget = Number(updatedProject.budget)
    const cost = Number(updatedProject.cost)

    if (budget < cost || budget < 0) {
      setMessage(
        'O orçamento não pode ser menor que o custo ou menor do que zero!'
      )
      setType('error')
      return
    }

    fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado!')
        setType('success')
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      {project ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}

            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>

              <button
                onClick={() => setShowProjectForm(!showProjectForm)}
                className={styles.btn}
              >
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>

              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category?.name}
                  </p>
                  <p>
                    <span>Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <ProjectForm
                  handleSubmit={editPost}
                  btnText="Editar"
                  projectData={project}
                />
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>

              <button
                className={styles.btn}
                onClick={() => setShowServiceForm(!showServiceForm)}
              >
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>

              {showServiceForm && (
                <ServiceForm
                  handleSubmit={createService}
                  btnText="Adicionar Serviço"
                  projectData={project}
                />
              )}
            </div>

            <h2>Serviços</h2>

            <Container customClass="start">
              {project.services && project.services.length > 0 ? (
                project.services.map((service) => (
                  <p key={service.id}>
                    {service.name} - R${service.cost}
                  </p>
                ))
              ) : (
                <p>Não há serviços cadastrados.</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project
