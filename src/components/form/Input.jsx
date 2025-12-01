import styles from './Input.module.css';

function Input({type, text, name, placeholder, handleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}: </label>
            <input type={type} name={name} placeholder={placeholder} value={value} id={name} onChange={handleOnChange}/>
        </div>
    )
}

export default Input;