import React from 'react';
import { authorize } from '../utils/Auth';
import { withRouter } from 'react-router-dom';


function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // сюда добавим логику обработки формы регистрации
    //console.log(email, password)
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail('');
          setPassword('');
          props.handleLogin(email);
          props.history.push('/');
        }
      })
      .catch(err => console.log(err));

  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="register">
      <h2 className="register__heading">Вход</h2>
      <form onSubmit={handleSubmit} className="register__form">

        <input id="email" placeholder="Email" className="register__input" name="email" type="email" value={email} onChange={handleEmailChange} />

        <input id="password" placeholder="Пароль" className="register__input" name="password" type="password" value={password} onChange={handlePasswordChange} />
        <div className="register__button-container">
          <button type="submit" className="register__submit">Войти</button>
        </div>
      </form>
    </section>
  );
}

export default withRouter(Login);