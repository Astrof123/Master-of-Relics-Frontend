import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect, useState, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function LoginPage() {
    const { error, isLoading, accessToken, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    })

    const [validationErrors, setValidationErrors] = useState({
        login: "",
        password: "",
        form: ""
    })

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken])

    const validateLogin = (login: string): string => {
        if (!login.trim()) {
            return "Логин не может быть пустым";
        }
        if (login.length < 4) {
            return "Логин должен содержать минимум 3 символа";
        }
        if (login.length > 30) {
            return "Логин не должен превышать 30 символов";
        }


        const loginRegex = /^[a-zA-Z0-9_-]+$/;
        if (!loginRegex.test(login)) {
            return "Логин может содержать только буквы, цифры, дефисы и подчеркивания";
        }
        return "";
    }

    const validatePassword = (password: string): string => {
        if (!password) {
            return "Пароль не может быть пустым";
        }
        if (password.length < 6) {
            return "Пароль должен содержать минимум 6 символов";
        }
        if (password.length > 50) {
            return "Пароль не должен превышать 50 символов";
        }

        const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(password);
        const hasNumber = /\d/.test(password);
        
        if (!hasLetter || !hasNumber) {
            return "Пароль должен содержать хотя бы одну букву и одну цифру";
        }
        return "";
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))

        if (name === 'login') {
            setValidationErrors(prev => ({
                ...prev,
                login: validateLogin(value)
            }))
        } else if (name === 'password') {
            setValidationErrors(prev => ({
                ...prev,
                password: validatePassword(value)
            }))
        }
    }

    const validateForm = (): boolean => {
        const loginError = validateLogin(formData.login);
        const passwordError = validatePassword(formData.password);

        setValidationErrors({
            login: loginError,
            password: passwordError,
            form: ""
        })

        return !loginError && !passwordError;
    }

    const login = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!validateForm()) {
            setValidationErrors(prev => ({
                ...prev,
                form: "Пожалуйста, исправьте ошибки в форме"
            }))
            return;
        }

        try {
            await handleLogin(formData);
        }
        catch (error) {
            setValidationErrors(prev => ({
                ...prev,
                form: "Произошла ошибка при входе. Попробуйте еще раз."
            }))
        }
    }

    const hasErrors = validationErrors.login || validationErrors.password || validationErrors.form;

    return (
        <>
            <h1>Страница входа</h1>
            <form onSubmit={login}>
                <label>
                    Введите логин: <br />
                    <input 
                        type='text' 
                        onChange={handleChange} 
                        name="login" 
                        value={formData.login} 
                        placeholder='Логин'
                        autoComplete="username" 
                        required
                        className={validationErrors.login ? 'error-input' : ''}
                        />
                </label>
                {validationErrors.login && (
                    <div className="error-message">{validationErrors.login}</div>
                )}
                <br />
                <label>
                    Введите пароль: <br />
                    <input 
                        type='password' 
                        onChange={handleChange} 
                        name="password" 
                        value={formData.password}
                        autoComplete="current-password" 
                        placeholder='Пароль' 
                        required
                        className={validationErrors.password ? 'error-input' : ''}
                        />
                </label>
                {validationErrors.password && (
                    <div className="error-message">{validationErrors.password}</div>
                )}
                <br />
                {validationErrors.form && (
                    <div className="error-message form-error">{validationErrors.form}</div>
                )}
                <span>{error}</span>
                <span>{isLoading ? "Загрузка" : ""}</span>
                <br />
                <button 
                    type="submit"
                    disabled={isLoading || hasErrors !== ""}
                >
                    {isLoading ? "Вход..." : "Войти"}
                </button>
            </form>
            <Link to="/register">
                У меня нет аккаунта
            </Link>
            
            <style>{`
                .error-input {
                    border: 2px solid #ff4444;
                    background-color: #fff8f8;
                }
                .error-message {
                    color: #ff4444;
                    font-size: 14px;
                    margin: 4px 0;
                }
                .form-error {
                    font-weight: bold;
                    margin: 10px 0;
                }
                button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    );
}

export default LoginPage;