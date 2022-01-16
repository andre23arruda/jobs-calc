import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiTrash } from 'react-icons/fi'

// utils
import { castPrice, title } from '../../utils/utils'
import { getApi, putApi } from '../../services/api'

// custom components
import Header from '../../components/Header'

// images and styles
import './EditJob.css'
import logoImg from '../../assets/images/money-color.svg'


function EditJob({ match }) {
    title('Editar Job')
    const { job_id } = match.params

    const history = useHistory()
    const token = localStorage.getItem('token')

    const [name, setName] = useState('')
    const [daily_hours, setDaily_hours] = useState(0)
    const [total_hours, setTotal_hours] = useState(0)
    const [budget, setBudget] = useState(0)

    useEffect(() => {
        getApi(`jobs/${ job_id }`, token)
        .then(({data, response_status}) => {
            if (response_status === 200) {
                setName(data.name)
                setDaily_hours(data.daily_hours)
                setTotal_hours(data.total_hours)
                setBudget(data.budget)
            } else throw 'Sem credenciais'
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

        putApi(`jobs/${ job_id }/`, data, token)
        .then(response => {
            history.push('/jobs')
        })
    }

    return (
        <div className="job-container">

            <Header title="Editar Job" />

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
                        O valor do projeto ficou em <br />
                        <strong>R$ { castPrice(budget) }</strong>
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

export default EditJob
