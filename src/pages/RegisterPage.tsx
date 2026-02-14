import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect, useState, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function RegisterPage() {
    const { error, accessToken, isLoading, handleRegister } = useAuth();
    const navigate = useNavigate();

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

    
    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken])

    const validateInviteCode = (code: string): string => {
        if (!code.trim()) {
            return "Инвайт-код не может быть пустым";
        }
        if (code.length < 3) {
            return "Инвайт-код должен содержать минимум 3 символа";
        }
        if (code.length > 50) {
            return "Инвайт-код не должен превышать 50 символов";
        }
        const codeRegex = /^[a-zA-Z0-9-]+$/;
        if (!codeRegex.test(code)) {
            return "Инвайт-код может содержать только английские буквы, цифры и дефисы";
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
        <>
            <h1>Страница регистрации</h1>
            <form onSubmit={register}>
                <label>
                    Введите инвайт-код: <br />
                    <input 
                        type='text' 
                        onChange={handleChange} 
                        name="inviteCode" 
                        value={formData.inviteCode} 
                        placeholder='Инвайт-код'
                        required
                        className={validationErrors.inviteCode ? 'error-input' : ''}
                        />
                </label>
                {validationErrors.inviteCode && (
                    <div className="error-message">{validationErrors.inviteCode}</div>
                )}
                <br />
                <label>
                    Введите никнейм: <br />
                    <input 
                        type='text' 
                        onChange={handleChange} 
                        name="nickname" 
                        value={formData.nickname} 
                        placeholder='Никнейм'
                        autoComplete="nickname" 
                        required
                        className={validationErrors.nickname ? 'error-input' : ''}
                        />
                </label>
                {validationErrors.nickname && (
                    <div className="error-message">{validationErrors.nickname}</div>
                )}
                <br />
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
                        autoComplete="new-password" 
                        placeholder='Пароль' 
                        required
                        className={validationErrors.password ? 'error-input' : ''}
                        />
                </label>
                {validationErrors.password && (
                    <div className="error-message">{validationErrors.password}</div>
                )}
                <br />
                <label>
                    Подтвердите пароль: <br />
                    <input 
                        type='password' 
                        onChange={handleChange} 
                        name="confirmPassword" 
                        value={formData.confirmPassword}
                        autoComplete="new-password" 
                        placeholder='Подтвердите пароль' 
                        required
                        className={validationErrors.confirmPassword ? 'error-input' : ''}
                        />
                </label>
                {validationErrors.confirmPassword && (
                    <div className="error-message">{validationErrors.confirmPassword}</div>
                )}
                <div className="password-hint">
                    Пароль должен содержать: минимум 6 символов, заглавные и строчные буквы, цифры и специальные символы
                </div>
                <br />
                {validationErrors.form && (
                    <div className="error-message form-error">{validationErrors.form}</div>
                )}
                <span>{error}</span>
                <span>{isLoading ? "Загрузка" : ""}</span>
                <br />
                <button 
                    type="submit"
                    disabled={isLoading || hasErrors}
                >
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </button>
            </form>
            <Link to="/login">
                У меня уже есть аккаунт
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
                .password-hint {
                    font-size: 12px;
                    color: #666;
                    margin: 5px 0;
                    font-style: italic;
                }
                button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    );
}

export default RegisterPage;