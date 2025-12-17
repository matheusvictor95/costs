import styles from '../project/styles/ProjectCard.module.css';
import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard({ id, name, cost, description, handleRemove }) {
    
   const remove = (e) =>
   {
    e.preventDefault()
    handleRemove(id, cost)
   }

  return (
    <div className={styles.project_card}>
      <h3>{name}</h3>
      <p>
        <span>Custo:</span> R${cost}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}><BsFillTrashFill/>Remover Serviço</button>
        
      </div>
    </div>
  );
}

export default ServiceCard