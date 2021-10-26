import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [isOk, setIsOk] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      register(email, password)
        .then((res) => {
          //console.log(res);
          if (res) {
            setEmail('');
            setPassword('');
            setIsOk(true);
            setTooltipOpen(true);
            setTimeout(() => props.history.push('/sign-in'), 3000);
          } else {
            setIsOk(false);
            setTooltipOpen(true);
          }

        })
        .catch(err => console.log(err));
    }


  }

  function handleClose() {
    setTooltipOpen(false);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="register">
      <h2 className="register__heading">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">

        <input id="email" placeholder="Email" className="register__input" name="email" type="email" value={email} onChange={handleEmailChange} />

        <input id="password" placeholder="Пароль" className="register__input" name="password" type="password" value={password} onChange={handlePasswordChange} />
        <div className="register__button-container">
          <button type="submit" className="register__submit">Зарегистрироваться</button>
        </div>
        <p className="register__bottom-text">Уже зарегистрированы? <Link to="/sign-in" className="register__bottom-link">Войти</Link></p>
      </form>
      <InfoTooltip isOpen={tooltipOpen} onClose={handleClose} isOk={isOk} />
    </section>
  );
}

export default withRouter(Register);