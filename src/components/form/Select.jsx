import styles from './Select.module.css';
function Select({text, name, placeholder, handleOnChange, value}){
    return(
        <div className={styles.form_control}>
                   <label htmlFor={name}>{text}: </label>
                   <select  name={name} placeholder={placeholder} value={value} id={name} onChange={handleOnChange}>
                    <option >Selecione uma opção:</option>
                   </select>
               </div>
    )
}

export default Select;