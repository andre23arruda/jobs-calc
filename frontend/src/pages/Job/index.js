import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiTrash } from 'react-icons/fi'

// utils
import { getApi, postApi } from '../../services/api'
import { title } from '../../utils/utils'

// custom components
import Header from '../../components/Header'

// images and styles
import './Job.css'
import logoImg from '../../assets/images/money-gray.svg'


function Job() {
    title('Criar Job')
    const history = useHistory()
    const token = localStorage.getItem('token')

    const [name, setName] = useState('Novo Job')
    const [daily_hours, setDaily_hours] = useState(2)
    const [total_hours, setTotal_hours] = useState(10)

    useEffect(() => {
        getApi(`profiles/`, token)
        .then(({response_status}) => {
            if (response_status !== 200)
                throw 'Sem credenciais'
        })
        .catch(error => {
            history.push('/jobs')
            alert('Algo estranho aconteceu!')
        })
    }, [])

    async function formSubmit(event) {
        event.preventDefault()

        const data = {
            name,
            daily_hours: parseInt(daily_hours),
            total_hours: parseInt(total_hours)
        }

        postApi(`jobs/`, data, token)
        .then(({response_status}) => {
            if (200 < response_status < 300)
                history.push('/jobs')
        })
    }

    return (
        <div className="job-container">

            <Header title="Adicionar Novo Job" />

            <div className="container animate-up delay-2">
                <main>

                    <form id="form-job" onSubmit={ formSubmit }>

                        <fieldset>
                            <legend>Dados do Job</legend>

                            <div className="separator light" />

                            <div className="input-wrapper">
                                <label htmlFor="name">Nome do Job</label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={ name }
                                    onChange={e => setName(e.target.value) }
                                />
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <label htmlFor="daily_hours">
                                        Quantas horas <br/>
                                        por dia vai dedicar ao job?
                                    </label>

                                    <input
                                        type="number"
                                        id="daily_hours"
                                        name="daily_hours"
                                        value={ daily_hours }
                                        onChange={e => setDaily_hours(e.target.value) }
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="total_hours">
                                        Estimativa de <br/>
                                        horas para esse Job?
                                    </label>

                                    <input
                                        type="number"
                                        id="total_hours"
                                        name="total_hours"
                                        value={ total_hours }
                                        onChange={e => setTotal_hours(e.target.value) }
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </main>

                <aside className="card">
                    <img src={ logoImg } alt="Imagem de Dinheiro" />

                    <p>
                        Preencha os dados ao lado para
                        ver o valor do projeto
                    </p>

                    <div className="button-group">
                        <button
                            className="button green"
                            form="form-job"
                            type="submit"
                            title="Salvar Dados"
                        >
                            Salvar
                        </button>

                        <Link to="/jobs" className="button gray" title='Cancelar'>
                            <FiTrash size={ 25 } color="#ccc" />
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Job
