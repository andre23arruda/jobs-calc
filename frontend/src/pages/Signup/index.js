import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

// utils
import { appendErrorMessages, title } from '../../utils/utils'
import { postApi } from '../../services/api'

// images and styles
import './Signup.css'
import logoImg from '../../assets/images/logo.svg'


function Signup() {
    title('Cadastrar')
    const history = useHistory()
    const [first_name, setFirst_name] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function formSignup(event) {
        event.preventDefault()
        const data = {
            username,
            first_name,
            password,
        }
        postApi(`signup/`, data)
        .then(({response_status}) => {
            if (200 < response_status < 300) {
                history.push('/')
            } else {
                alert(`Erro ao cadastrar. Tente novamente`)
            }
        })
    }

    return (
        <div className="signup-container">
            <section className="form">

                <form onSubmit={ formSignup }>
                    <img src={ logoImg } alt="Jobs Calc"/>

                    <label>Nome</label>
                    <input
                        type="text"
                        onChange={ e => setFirst_name(e.target.value) }
                        />

                    <label>Usuário</label>
                    <input
                        type="text"
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
                        Cadastrar
                    </button>

                    <Link to="/" className="back-link">
                        <FiLogIn size={ 25 } color="#ccc"/>

                        Lembrou
                    </Link>
                </form>
            </section>
        </div>
    )
}

export default Signup
