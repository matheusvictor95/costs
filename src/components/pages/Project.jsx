import { useState } from 'react'
import { useParams } from 'react-router'
import styles from './styles/Project.module.css'

// Componentes de Layout
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import Message from '../layout/Message'

// Componentes de Negócio
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

// Hook Customizado
import { useProject } from '../../hooks/useProject'

function Project() {
  const { id } = useParams()
  
  // 1. Consome toda a lógica do nosso Hook
  const { project, message, type, editPost, createService, removeService } = useProject(id)

  // 2. Estados locais apenas para controle de visibilidade da UI
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)

  // 3. Funções auxiliares de toggle (opcional, para deixar o JSX mais limpo)
  const toggleProjectForm = () => setShowProjectForm(!showProjectForm)
  const toggleServiceForm = () => setShowServiceForm(!showServiceForm)

  // Renderização condicional: se o projeto ainda não carregou
  if (!project) return <Loading />

  return (
    <div className={styles.project_details}>
      <Container customClass="column">
        {/* Sistema de mensagens dinâmico */}
        {message && <Message type={type} msg={message} />}

        <div className={styles.details_container}>
          <h1>Projeto: {project.name}</h1>
          <button onClick={toggleProjectForm} className={styles.btn}>
            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
          </button>

          {!showProjectForm ? (
            <div className={styles.project_info}>
              <p><span>Categoria:</span> {project.category?.name}</p>
              <p><span>Orçamento:</span> R${project.budget}</p>
              <p><span>Total Utilizado:</span> R${project.cost}</p>
            </div>
          ) : (
            <ProjectForm
              handleSubmit={(data) => {
                editPost(data)
                setShowProjectForm(false) // Fecha o form após editar
              }}
              btnText="Salvar Edição"
              projectData={project}
            />
          )}
        </div>

        <div className={styles.service_form_container}>
          <h2>Adicione um serviço:</h2>
          <button onClick={toggleServiceForm} className={styles.btn}>
            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
          </button>
          
          {showServiceForm && (
            <ServiceForm
              handleSubmit={(data) => {
                createService(data)
                setShowServiceForm(false) // Fecha o form após adicionar
              }}
              btnText="Adicionar"
              projectData={project}
            />
          )}
        </div>

        <h2>Serviços</h2>
        <Container customClass="start">
          {project.services && project.services.length > 0 ? (
            project.services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                cost={service.cost}
                description={service.description}
                handleRemove={removeService}
              />
            ))
          ) : (
            <p>Não há serviços cadastrados.</p>
          )}
        </Container>
      </Container>
    </div>
  )
}

export default Project