import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'

// custom components
import Header from '../../components/Header'

// utils
import { castPrice, title } from '../../utils/utils'
import { getApi, putApi } from '../../services/api'

// images and styles
import './Profile.css'


function Profile() {
    title('Meu Perfil')
    const history = useHistory()
    const token = localStorage.getItem('token')
    const [profile_id, setProfile_id] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [monthly_budget, setMonthly_budget ] =  useState('')
    const [days_per_week, setDays_per_week ] =  useState('')
    const [hours_per_day, setHours_per_day ] =  useState('')
    const [vacation_per_year, setVacation_per_year ] =  useState('')
    const [value_hour, setValue_hour] = useState(0)

    const [profileName, setProfileName] = useState('')
    const [profileAvatar, setProfileAvatar] = useState('')

    useEffect(() => {
        getApi(`profiles/`, token)
        .then(({data, response_status}) => {
            if (200 < response_status < 300) {
                const profile = data[0]
                setProfile_id(profile.id)
                setMonthly_budget(profile.monthly_budget)
                setName(profile.name)
                setAvatar(profile.avatar)
                setDays_per_week(profile.days_per_week)
                setHours_per_day(profile.hours_per_day)
                setVacation_per_year(profile.vacation_per_year)
                setValue_hour(profile.value_hour)
                setProfileName(profile.name)
                setProfileAvatar(profile.avatar)
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
            avatar,
            monthly_budget: parseFloat(monthly_budget),
            days_per_week: parseInt(days_per_week),
            hours_per_day: parseInt(hours_per_day),
            vacation_per_year: parseInt(vacation_per_year),
        }

        putApi(`profiles/${ profile_id }/`, data, token)
        .then(({data, response_status}) => {
            if (200 < response_status < 300) {
                setProfileName(data.name)
                setProfileAvatar(data.avatar)
                setValue_hour(data.value_hour)
            }
        })
    }

    return (
        <div className="profile-container">

            <Header title="Meu Perfil" />

            <div className="container animate-up delay-2">
                <aside className="card">
                    { profileAvatar ?
                        <img className="avatar" src={ profileAvatar } alt="User's avatar"/>
                    :
                        <div className="avatar">
                            <FiUser size={ 120 } color="#ccc"/>
                        </div>
                    }

                    <h2>{ profileName }</h2>

                    <p>
                        O valor da sua hora é
                        <br/>
                        <strong>R$ { castPrice(value_hour) }</strong>
                    </p>

                    <button
                        className="button green"
                        form="form-profile"
                        type="submit"
                    >
                        Salvar dados
                    </button>
                </aside>

                <main>
                    <form
                        id="form-profile"
                        onSubmit={ formSubmit }
                    >
                        <fieldset>
                            <legend>Dados do perfil</legend>

                            <div className="separator light" />

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <label htmlFor="name">Nome</label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={ name }
                                        onChange={e => setName(e.target.value) }
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="avatar">Link da foto</label>

                                    <input
                                        placeholder="https://"
                                        type="url"
                                        id="avatar"
                                        name="avatar"
                                        value={ avatar }
                                        onChange={e => setAvatar(e.target.value) }
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Planejamento</legend>

                            <div className="separator light" />

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <label htmlFor="monthly-budget">
                                        Quanto eu
                                        <br/>
                                        quero ganhar por mês?
                                    </label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        id="monthly-budget"
                                        name="monthly-budget"
                                        placeholder="R$"
                                        value={ monthly_budget }
                                        onChange={e => setMonthly_budget(e.target.value) }
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="hours-per-day">
                                        Quantas horas
                                        <br/>
                                        quero trabalhar por dia?
                                    </label>

                                    <input
                                        type="number"
                                        id="hours-per-day"
                                        name="hours-per-day"
                                        value={ hours_per_day }
                                        onChange={e => setHours_per_day(e.target.value) }
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <label htmlFor="days-per-week">
                                        Quantos dias
                                        <br/>
                                        quero trabalhar por semana?
                                    </label>

                                    <input
                                        type="number"
                                        id="days-per-week"
                                        name="days-per-week"
                                        value={ days_per_week }
                                        onChange={e => setDays_per_week(e.target.value) }
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="vacation-per-year">
                                        Quantas semanas
                                        <br/>
                                        por ano você quer tirar férias?
                                    </label>

                                    <input
                                        type="number"
                                        id="vacation-per-year"
                                        name="vacation-per-year"
                                        value={ vacation_per_year }
                                        onChange={e => setVacation_per_year(e.target.value) }
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Profile
