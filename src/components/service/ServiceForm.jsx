import styles from '../project/styles/ProjectForm.module.css';
import { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

function ServiceForm({btnText, projectData, handleSubmit})
{
    const [service, setService] = useState({});

    function submit(e)
    {
        e.preventDefault()
        const updateproject = {...projectData, services: [...projectData.services || [], service]}
        handleSubmit(updateproject)
    }

    function handleServiceChange(e)
    {
        setService({...service, [e.target.name]: e.target.value});
        
    }

    return (
        <form onSubmit={submit} className={styles.form}>
          <Input type="text" text="Nome do serviço" name="name" placeholder ="Insira o nome do serviço" handleOnChange={handleServiceChange}/>
          <Input type="number" text="Custo do serviço" name="cost" placeholder ="Insira o valor total" handleOnChange={handleServiceChange}/>
          <Input type="text" text="Descrição do serviço" name="description" placeholder ="Insira a descrição do serviço" handleOnChange={handleServiceChange}/>
          <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm;