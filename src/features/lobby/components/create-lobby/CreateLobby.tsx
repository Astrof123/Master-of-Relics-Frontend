import { useState, type ChangeEvent } from "react";
import type { Lobby } from "../../types/lobby";
import styles from "./CreateLobby.module.css";

interface CreateLobbyProps {
    onCreateLobby: (data: Partial<Lobby>) => void
}

const CreateLobby = (props: CreateLobbyProps) => {
    const [formData, setFormData] = useState({
        name: ""
    })

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
            return;
        }
        
        if (formData.name.length < 3 || formData.name.length > 20) {
            return;
        }

        props.onCreateLobby({
            name: formData.name
        });
        setFormData(prev => ({
            ...prev, 
            ["name"]: ""
        }))
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Создание лобби</h2>
            <form onSubmit={handleCreateLobby}>
                <label className={styles.label}>
                    Имя лобби: <br />
                    <input 
                        className={styles.input}
                        type="text" 
                        name="name" 
                        placeholder="Введите название лобби"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                
                <button className={styles.button} type="submit">
                    Создать лобби
                </button>
            </form>
        </div>
    );
}

export default CreateLobby;