import styles from './ProjectForm.module.css';
import Input from '../form/input';
import Select from '../form/Select';
import Button from '../form/SubmitButton';

function ProjectForm({btnText}) {
  return (
    <form className={styles.form}>
      <Input type="text" text="Nome do Projeto" name="name" placeholder= "Digite o nome do projeto"/>
      <Input type="number" text="Orçamento" placeholder="Digite o orçamento total do projeto" name="budget"/>
     <Select name="category_id" text="Selecione a Categoria"/>
     <Button text={btnText}/>
    </form>
  );
}

export default ProjectForm;
