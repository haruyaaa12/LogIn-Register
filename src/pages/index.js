import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin }, reset: resetLogin } = useForm();
  const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister }, reset: resetRegister } = useForm();
  const [isRegistering, setIsRegistering] = useState(false);

  const onSubmitRegister = (data) => {
    console.log("Registering:", data);
    resetRegister();
  };

  const onSubmitLogin = (data) => {
    console.log("Logging in:", data);
    resetLogin();
  };

  const showRegisterForm = () => {
    setIsRegistering(true);
  };

  const showLoginForm = () => {
    setIsRegistering(false);
  };

  return (
    <div>
      <div className="button-container">
        <button className="outside-container" onClick={showRegisterForm}>Register</button>
        <button className="outside-container" onClick={showLoginForm}>Login</button>
      </div>

      <div className="container">
        <form id="registerForm" className={isRegistering ? "active" : ""} onSubmit={handleSubmitRegister(onSubmitRegister)}>

          {isRegistering && <h2>Register</h2>}
          {isRegistering && <input type="text" placeholder="Username" {...registerRegister('username', { required: true })} />}
          {isRegistering && errorsRegister.username && <span>Username is required</span>}
          {isRegistering && <input type="text" placeholder="Gender" {...registerRegister('gender', { required: true })} />}
          {isRegistering && errorsRegister.gender && <span>Gender is required</span>}
          {isRegistering && <input type="date" placeholder="Birthday" {...registerRegister('birthday', { required: true })} />}
          {isRegistering && errorsRegister.birthday && <span>Birthday is required</span>}
          <input type="email" placeholder="Email" {...registerRegister('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errorsRegister.email && <span>Email is required and must be valid</span>}
          <input type="password" placeholder="Password" {...registerRegister('password', { required: true, minLength: 8 })} />
          {errorsRegister.password && <span>Password is required and must be at least 8 characters</span>}

          {isRegistering && <button type="submit">Register</button>}
        </form>

        <form id="loginForm" className={!isRegistering ? "active" : ""} onSubmit={handleSubmitLogin(onSubmitLogin)}>

          {!isRegistering && <h2>Login</h2>}
          <input type="email" placeholder="Email" {...registerLogin('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errorsLogin.email && <span>Email is required and must be valid</span>}
          <input type="password" placeholder="Password" {...registerLogin('password', { required: true, minLength: 8 })} />
          {errorsLogin.password && <span>Password is required and must be at least 8 characters</span>}
          {!isRegistering && <button type="submit">Login</button>}
          
        </form>
      </div>
    </div>
  );
}
