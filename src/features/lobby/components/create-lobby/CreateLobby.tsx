import { useState, type ChangeEvent } from "react";
import type { Lobby } from "../../types/lobby";
import styles from "./CreateLobby.module.css";
import clsx from "clsx";

interface CreateLobbyProps {
    onCreateLobby: (data: Partial<Lobby>) => void
}

const CreateLobby = (props: CreateLobbyProps) => {
    const [formData, setFormData] = useState({
        name: ""
    })

    const [touched, setTouched] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const handleCreateLobby = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name.trim()) {
            setTouched(true);
            return;
        }
        
        if (formData.name.length < 3 || formData.name.length > 20) {
            setTouched(true);
            return;
        }

        props.onCreateLobby({
            name: formData.name
        });
        setFormData(prev => ({
            ...prev, 
            ["name"]: ""
        }))
        setTouched(false);
    }

    const getInputClass = () => {
        if (!touched) return styles.input;
        if (formData.name.length >= 3 && formData.name.length <= 20) {
            return clsx(styles.input, styles.valid);
        }
        return clsx(styles.input, styles.invalid);
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Создание лобби</h2>
            <form onSubmit={handleCreateLobby}>
                <label className={styles.label}>
                    Название лобби
                    <input 
                        className={getInputClass()}
                        type="text" 
                        name="name" 
                        placeholder="Введите название (3-20 символов)"
                        value={formData.name}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={20}
                        required
                    />
                </label>
                
                {touched && formData.name.length > 0 && formData.name.length < 3 && (
                    <div className={styles["helper-text"]}>
                        Слишком короткое имя (минимум 3 символа)
                    </div>
                )}
                
                {touched && formData.name.length > 20 && (
                    <div className={styles["helper-text"]}>
                        Слишком длинное имя (максимум 20 символов)
                    </div>
                )}

                <button className={styles.button} type="submit">
                    Создать лобби
                </button>
            </form>
        </div>
    );
}

export default CreateLobby;