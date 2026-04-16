import { useState, type ChangeEvent } from "react";
import type { Lobby } from "../../types/lobby";
import styles from "./CreateLobby.module.css";
import clsx from "clsx";
import LockImg from "@assets/icons/lock.png";

interface CreateLobbyProps {
    onCreateLobby: (data: Partial<Lobby>) => void
}

const CreateLobby = (props: CreateLobbyProps) => {
    const [formData, setFormData] = useState({
        name: "",
        isPrivate: false
    })

    const [touched, setTouched] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'checkbox' ? checked : value
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
            name: formData.name,
            isPrivate: formData.isPrivate
        });
        setFormData(prev => ({
            ...prev, 
            name: "",
            isPrivate: false
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

                <label className={clsx(styles.label, styles["checkbox-label"])}>
                    <div className={styles["checkbox-label-inner-wrapper"]}>
                        <span className={styles["checkbox-text"]}>
                            <img className={styles["checkbox-icon"]} src={LockImg} alt="" />
                            Приватное лобби: 
                        </span>
                        <input 
                            type="checkbox" 
                            name="isPrivate"
                            checked={formData.isPrivate}
                            onChange={handleChange}
                            className={styles["checkbox-input"]}
                        />
                        <span className={styles["checkbox-custom"]}></span>
                    </div>
                        <span className={styles["checkbox-description"]}>
                            {formData.isPrivate ? 
                                "Лобби будет скрыто от общего списка. Доступ только по коду или по приглашению." : 
                                "Лобби будет видно всем игрокам."}
                        </span>
                </label>

                <button className={styles.button} type="submit">
                    Создать лобби
                </button>
            </form>
        </div>
    );
}

export default CreateLobby;