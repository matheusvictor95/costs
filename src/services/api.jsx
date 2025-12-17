const BASE_URL = 'http://localhost:5000'

export const projectService = {

  getById: (id) => 
    fetch(`${BASE_URL}/projects/${id}`).then(resp => resp.json()),

 
  update: (project) => 
    fetch(`${BASE_URL}/projects/${project.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    }).then(resp => resp.json())
}