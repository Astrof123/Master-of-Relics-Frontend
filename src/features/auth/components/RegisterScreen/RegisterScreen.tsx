import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";
import { setNullError } from "../../store/authSlice";
import { useAppDispatch } from "@/app/store";

function RegisterScreen() {
    const { error, accessToken, isLoading, handleRegister } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        nickname: "",
        login: "",
        password: "",
        confirmPassword: "",
        inviteCode: ""
    })

    const [validationErrors, setValidationErrors] = useState({
        inviteCode: "",
        nickname: "",
        login: "",
        password: "",
        confirmPassword: "",
        form: ""
    })

    const [touched, setTouched] = useState({
        inviteCode: false,
        nickname: false,
        login: false,
        password: false,
        confirmPassword: false
    })

    useEffect(() => {
        dispatch(setNullError())
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken, navigate])

    const validateInviteCode = (code: string): string => {
        if (!code.trim()) {
            return "Инвайт-код не может быть пустым";
        }
        if (code.length < 4) {
            return "Инвайт-код должен содержать минимум 4 символа";
        }
        if (code.length > 36) {
            return "Инвайт-код не должен превышать 36 символов";
        }
        return "";
    }

    const validateNickname = (nickname: string): string => {
        if (!nickname.trim()) {
            return "Никнейм не может быть пустым";
        }
        if (nickname.length < 4) {
            return "Никнейм должен содержать минимум 4 символа";
        }
        if (nickname.length > 30) {
            return "Никнейм не должен превышать 30 символов";
        }
        const nicknameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s_\-.,!?]+$/;
        if (!nicknameRegex.test(nickname)) {
            return "Никнейм содержит недопустимые символы";
        }
        if (nickname !== nickname.trim()) {
            return "Никнейм не должен начинаться или заканчиваться пробелом";
        }
        return "";
    }

    const validateLogin = (login: string): string => {
        if (!login.trim()) {
            return "Логин не может быть пустым";
        }
        if (login.length < 4) {
            return "Логин должен содержать минимум 4 символа";
        }
        if (login.length > 30) {
            return "Логин не должен превышать 30 символов";
        }
        const loginRegex = /^[a-zA-Z0-9_-]+$/;
        if (!loginRegex.test(login)) {
            return "Логин может содержать только английские буквы, цифры, дефисы и подчеркивания";
        }
        if (/^\d+$/.test(login)) {
            return "Логин не может состоять только из цифр";
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
        return "";
    }

    const validateConfirmPassword = (password: string, confirmPassword: string): string => {
        if (!confirmPassword) {
            return "Подтвердите пароль";
        }
        if (password !== confirmPassword) {
            return "Пароли не совпадают";
        }
        return "";
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setFormData(prev => {
            const newFormData = {
                ...prev, 
                [name]: value
            };
            
            if (name === 'password' && prev.confirmPassword) {
                setValidationErrors(validation => ({
                    ...validation,
                    confirmPassword: validateConfirmPassword(value, prev.confirmPassword)
                }));
            }
            
            if (name === 'confirmPassword') {
                setValidationErrors(validation => ({
                    ...validation,
                    confirmPassword: validateConfirmPassword(prev.password, value)
                }));
            }
            
            return newFormData;
        });

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        if (name === 'inviteCode') {
            setValidationErrors(prev => ({
                ...prev,
                inviteCode: validateInviteCode(value)
            }));
        } else if (name === 'nickname') {
            setValidationErrors(prev => ({
                ...prev,
                nickname: validateNickname(value)
            }));
        } else if (name === 'login') {
            setValidationErrors(prev => ({
                ...prev,
                login: validateLogin(value)
            }));
        } else if (name === 'password') {
            setValidationErrors(prev => ({
                ...prev,
                password: validatePassword(value)
            }));
        }
    }

    const validateForm = (): boolean => {
        const inviteCodeError = validateInviteCode(formData.inviteCode);
        const nicknameError = validateNickname(formData.nickname);
        const loginError = validateLogin(formData.login);
        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

        setValidationErrors({
            inviteCode: inviteCodeError,
            nickname: nicknameError,
            login: loginError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
            form: ""
        });

        return !inviteCodeError && !nicknameError && !loginError && !passwordError && !confirmPasswordError;
    }

    const register = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!validateForm()) {
            setValidationErrors(prev => ({
                ...prev,
                form: "Пожалуйста, исправьте ошибки в форме"
            }));
            return;
        }

        try {
            const { confirmPassword, ...registerData } = formData;
            await handleRegister(registerData);
        }
        catch (error) {
            setValidationErrors(prev => ({
                ...prev,
                form: "Произошла ошибка при регистрации. Попробуйте еще раз."
            }));
        }
    }

    const hasErrors = Object.values(validationErrors).some(error => error);

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1 className="auth-title">
                    Регистрация
                    <div className="auth-title-border"></div>
                </h1>
                <form onSubmit={register}>
                    <div className="auth-field">
                        <label className="auth-label">
                            Инвайт-код
                        </label>
                        <input 
                            type='text' 
                            onChange={handleChange} 
                            name="inviteCode" 
                            value={formData.inviteCode} 
                            placeholder="Введите инвайт-код"
                            required
                            className={clsx(
                                "auth-input",
                                touched.inviteCode && validationErrors.inviteCode && "error",
                                touched.inviteCode && !validationErrors.inviteCode && formData.inviteCode && "valid"
                            )}
                        />
                        {touched.inviteCode && validationErrors.inviteCode && (
                            <div className="auth-error-message">
                                {validationErrors.inviteCode}
                            </div>
                        )}
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">
                            Никнейм
                        </label>
                        <input 
                            type='text' 
                            onChange={handleChange} 
                            name="nickname" 
                            value={formData.nickname} 
                            placeholder="Как к вам обращаться?"
                            autoComplete="nickname" 
                            required
                            className={clsx(
                                "auth-input",
                                touched.nickname && validationErrors.nickname && "error",
                                touched.nickname && !validationErrors.nickname && formData.nickname && "valid"
                            )}
                        />
                        {touched.nickname && validationErrors.nickname && (
                            <div className="auth-error-message">
                                {validationErrors.nickname}
                            </div>
                        )}
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">
                            Логин
                        </label>
                        <input 
                            type='text' 
                            onChange={handleChange} 
                            name="login" 
                            value={formData.login} 
                            placeholder="Придумайте логин"
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
                            autoComplete="new-password" 
                            placeholder="Придумайте пароль" 
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
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">
                            Подтверждение пароля
                        </label>
                        <input 
                            type='password' 
                            onChange={handleChange} 
                            name="confirmPassword" 
                            value={formData.confirmPassword}
                            autoComplete="new-password" 
                            placeholder="Подтвердите пароль" 
                            required
                            className={clsx(
                                "auth-input",
                                touched.confirmPassword && validationErrors.confirmPassword && "error",
                                touched.confirmPassword && !validationErrors.confirmPassword && formData.confirmPassword && "valid"
                            )}
                        />
                        {touched.confirmPassword && validationErrors.confirmPassword && (
                            <div className="auth-error-message">
                                {validationErrors.confirmPassword}
                            </div>
                        )}
                        <div className="auth-hint">
                            Пароль должен содержать минимум 6 символов
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="auth-button"
                        disabled={isLoading || hasErrors}
                    >
                        {isLoading ? (
                            <>
                                <span className="auth-loader"></span>
                                Загрузка...
                            </>
                        ) : (
                            "Зарегистрироваться"
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
                
                <Link to="/login" className="auth-link">
                    Уже есть доступ
                </Link>
            </div>
        </div>
    );
}

export default RegisterScreen;