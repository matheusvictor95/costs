import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { projectService } from '../services/api'

export function useProject(id) {
  const [project, setProject] = useState(null)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  // Carrega os dados iniciais
  useEffect(() => {
    projectService.getById(id)
      .then((data) => setProject(data))
      .catch((err) => console.log(err))
  }, [id])

  // Função auxiliar para mostrar mensagens que desaparecem
  const flashMessage = (msg, msgType) => {
    setMessage(msg)
    setType(msgType)
    // Limpa a mensagem após 3 segundos
    setTimeout(() => setMessage(''), 3000)
  }

  // Lógica: Editar Projeto
  function editPost(updatedProject) {
    const budget = Number(updatedProject.budget)
    const cost = Number(updatedProject.cost)

    if (budget < cost || budget < 0) {
      flashMessage('O orçamento não pode ser menor que o custo!', 'error')
      return
    }

    projectService.update(updatedProject)
      .then((data) => {
        setProject(data)
        flashMessage('Projeto atualizado!', 'success')
      })
      .catch(err => console.log(err))
  }

  // Lógica: Criar Serviço
  function createService(updatedProject) {
    const services = updatedProject.services || []
    const lastService = services[services.length - 1]
    const newService = { ...lastService, id: uuidv4() }

    const newCost = Number(updatedProject.cost) + Number(newService.cost)

    if (newCost > Number(updatedProject.budget)) {
      flashMessage('Orçamento ultrapassado, verifique o valor do serviço!', 'error')
      return
    }

    const projectToUpdate = {
      ...updatedProject,
      cost: newCost,
      services: [...services.slice(0, -1), newService],
    }

    projectService.update(projectToUpdate)
      .then((data) => {
        setProject(data)
        flashMessage('Serviço adicionado!', 'success')
      })
      .catch(err => console.log(err))
  }

  // Lógica: Remover Serviço
  function removeService(serviceId, serviceCost) {
    const servicesUpdated = project.services.filter(s => s.id !== serviceId)
    
    const projectUpdated = {
      ...project,
      services: servicesUpdated,
      cost: Number(project.cost) - Number(serviceCost)
    }

    projectService.update(projectUpdated)
      .then(() => {
        setProject(projectUpdated)
        flashMessage('Serviço removido com sucesso!', 'success')
      })
      .catch(err => console.log(err))
  }

  return {
    project,
    message,
    type,
    editPost,
    createService,
    removeService
  }
}