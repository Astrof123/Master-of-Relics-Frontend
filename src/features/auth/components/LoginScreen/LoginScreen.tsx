import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState, type ChangeEvent } from "react";
import clsx from "clsx";
import { useAppDispatch } from "@/app/store";
import { setNullError } from "../../store/authSlice";

function LoginScreen() {
    const { error, isLoading, accessToken, handleLogin } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    })

    const [validationErrors, setValidationErrors] = useState({
        login: "",
        password: "",
        form: ""
    })

    const [touched, setTouched] = useState({
        login: false,
        password: false
    })

    useEffect(() => {
        dispatch(setNullError())

        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate])

    const validateLogin = (login: string): string => {
        if (!login.trim()) {
            return "Логин не может быть пустым";
        }
        // if (login.length < 4) {
        //     return "Логин должен содержать минимум 4 символа";
        // }
        if (login.length > 30) {
            return "Логин не должен превышать 30 символов";
        }
        // const loginRegex = /^[a-zA-Z0-9_-]+$/;
        // if (!loginRegex.test(login)) {
        //     return "Логин может содержать только буквы, цифры, дефисы и подчеркивания";
        // }
        return "";
    }

    const validatePassword = (password: string): string => {
        if (!password) {
            return "Пароль не может быть пустым";
        }
        // if (password.length < 6) {
        //     return "Пароль должен содержать минимум 6 символов";
        // }
        if (password.length > 50) {
            return "Пароль не должен превышать 50 символов";
        }
        const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(password);
        const hasNumber = /\d/.test(password);
        
        if (!hasLetter && !hasNumber) {
            return "Пароль должен содержать хотя бы одну букву или одну цифру";
        }
        return "";
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))

        setTouched(prev => ({
            ...prev,
            [name]: true
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

    const hasErrors = Object.values(validationErrors).some(error => error);

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1 className="auth-title">
                    Вход
                    <div className="auth-title-border"></div>
                </h1>
                                
                <form onSubmit={login}>
                    <div className="auth-field">
                        <label className="auth-label">
                            Логин
                        </label>
                        <input 
                            type='text' 
                            onChange={handleChange} 
                            name="login" 
                            value={formData.login} 
                            placeholder="Введите ваш логин"
                            autoComplete="username" 
                            required
                            className={clsx(
                                "auth-input",
                                touched.login && validationErrors.login && "error",
                                touched.login && !validationErrors.login && formData.login && "valid"
                            )}
                        />
                        {touched.login && validationErrors.login && (
                            <div className="auth-error-message">
                                {validationErrors.login}
                            </div>
                        )}
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">
                            Пароль
                        </label>
                        <input 
                            type='password' 
                            onChange={handleChange} 
                            name="password" 
                            value={formData.password}
                            autoComplete="current-password" 
                            placeholder="Введите ваш пароль" 
                            required
                            className={clsx(
                                "auth-input",
                                touched.password && validationErrors.password && "error",
                                touched.password && !validationErrors.password && formData.password && "valid"
                            )}
                        />
                        {touched.password && validationErrors.password && (
                            <div className="auth-error-message">
                                {validationErrors.password}
                            </div>
                        )}
                        {/* <div className="auth-hint">
                            Пароль должен содержать буквы или цифры, минимум 6 символов
                        </div> */}
                    </div>

                    <button 
                        type="submit"
                        className="auth-button"
                        disabled={isLoading || hasErrors}
                    >
                        {isLoading ? (
                            <>
                                <span className="auth-loader"></span>
                                Вход...
                            </>
                        ) : (
                            "Войти"
                        )}
                    </button>
                </form>

                {error && (
                    <div className="auth-error-banner">
                        {error}
                    </div>
                )}
                
                {validationErrors.form && (
                    <div className="auth-error-banner">
                        {validationErrors.form}
                    </div>
                )}
                
                <Link to="/register" className="auth-link">
                    У меня нет аккаунта
                </Link>
            </div>
        </div>
    );
}

export default LoginScreen;