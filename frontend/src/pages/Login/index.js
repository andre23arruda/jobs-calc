import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

// utils
import { appendErrorMessages, title } from '../../utils/utils'
import { postApi } from '../../services/api'

// images and styles
import './Login.css'
import logoImg from '../../assets/images/logo.svg'


function Login() {
    title('Login')

    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function formLogin(event) {
        event.preventDefault()
        const data = {
            username,
            password,
        }
        postApi(`login/`, data)
        .then(({data, response_status}) => {
            console.log(data)
            if (200 < response_status < 300) {
                localStorage.setItem('token', data.token)
                history.push('/jobs')
            } else {
                alert(`Erro no login. Tente novamente`)
            }
        })
    }

    return (
        <div className="login-container">
            <section className="form">

                <form onSubmit={ formLogin }>
                    <img src={ logoImg } alt="Jobs Calc"/>

                    <label>Usuário</label>
                    <input
                        type="text"
                        placeholder="usuario.123"
                        onChange={ e => setUsername(e.target.value) }
                    />

                    <label>Senha</label>
                    <input
                        type="password"
                        placeholder="********"
                        onChange={ e => setPassword(e.target.value) }
                    />

                    <button
                        className="button"
                        type="submit"
                    >
                        Entrar
                    </button>

                    <Link to="/signup" className="back-link">
                        Não tenho cadastro
                        <FiLogIn size={ 25 } color="#ccc"/>
                    </Link>
                </form>
            </section>
        </div>
    )
}

export default Login
