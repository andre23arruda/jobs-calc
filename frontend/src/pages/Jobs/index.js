import React, { useEffect, useState } from 'react'
import { FiAlertCircle, FiPlus, FiUser } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

// utils
import { getApi } from '../../services/api'
import { title } from '../../utils/utils'

// custom components
import JobCard from '../../components/JobCard'
import Modal from '../../components/Modal'

// images and styles
import './Jobs.css'
import logoImg from '../../assets/images/logo.svg'


function Jobs() {
    title('Jobs')
    const history = useHistory()
    const token = localStorage.getItem('token')

    const [jobs, setJobs] = useState([])
    const [profile, setProfile] = useState({
        'id': 0,
        'name': '',
        'value_hour': 0,
        'status_count': {
            'done': 0,
            'progress': 0,
            'total': 0,
            'free_hours': 0
        }
    })
    const [showModal, setShowModal] = useState(false)
    const [id_to_delete, setId_to_delete] = useState(null)

    useEffect(() => {
        getApi(`profiles/`, token)
        .then(({data, response_status}) => {
            if (response_status >= 400) {
                localStorage.setItem('token', '')
                history.push('/')
                // alert('Sessão expirada!')
                return
            }
            setProfile(data[0])
        })
        .catch(error => {
            history.push('/')
            alert('Sessão expirada!')
        })

        if (profile) {
            getApi(`jobs/`, token)
            .then(({data, response_status}) => {
                setJobs(data)
            })
            // .catch(error => {
            //     history.push('/')
            //     alert('Sessão expirada!')
            // })
        }

    }, [])

    function logout() {
        localStorage.clear()
        history.push('/')
    }

    function updateJobs() {
        const newJobs = [...jobs]
        setJobs(newJobs.filter(job => job.id !== id_to_delete))
        getApi(`profiles/`, token)
        .then(({data, response_status}) => {
            if (200 < response_status < 300)
                setProfile(data[0])
        })
    }

    return (
        <div className="jobs-container">
            <header className="page-header">
                <div className="container">
                    <section id="top" className="animate-up">
                        <h2 className="sr-only">Homepage</h2>

                        <img id="logo" src={ logoImg } alt="Logo" />

                        <span id="notification">
                            <FiAlertCircle size={ 25 } color="#F1972C"/>
                            &nbsp;
                            { profile.status_count.free_hours <=0 ?
                                'Você não tem horas livres'
                            :
                                `Você tem ${ profile.status_count.free_hours } horas livres no seu dia`
                            }
                        </span>

                        <div id="avatar-profile">
                            <div>
                                { profile.name }

                                <div className="links">
                                    <Link to="/profile">
                                        <span>Ver perfil</span>
                                    </Link>

                                    <span onClick={ logout }>Sair</span>
                                </div>

                            </div>

                            { profile.avatar ?
                                <img className="avatar" src={ profile.avatar } alt="User's avatar"/>
                            :
                                <div className="avatar">
                                    <FiUser size={ 35 } color="#ccc"/>
                                </div>
                            }
                        </div>
                    </section>

                    <div className="separator" />

                    <section id="summary" className="animate-up delay-1">

                        <h2 className="sr-only">Sumário</h2>

                        <div className="info">
                            <div className="total">
                                <strong>{ profile.status_count.total }</strong>
                                Projetos ao total
                            </div>

                            <div className="in-progress">
                                <strong>{ profile.status_count.progress }</strong>
                                Em andamento
                            </div>

                            <div className="finished">
                                <strong>{ profile.status_count.done }</strong>
                                Encerrados
                            </div>
                        </div>

                        <Link className="button orange" to="/job">
                            <span>
                                <FiPlus size={ 25 } color="#fff"/>
                            </span>

                            Adicionar novo job
                        </Link>
                    </section>
                </div>
            </header>

            <div className="container">
                <main className="animate-up delay-2">
                    <h1 className="sr-only">Trabalhos</h1>

                    <div className="cards">
                        { jobs.map(job => (
                            <JobCard
                                key={ job.id }
                                { ...job }
                                setShowModal={ setShowModal }
                                setId_to_delete={ setId_to_delete }
                            />
                        ))}
                    </div>
                </main>
            </div>

            <Modal
                showModal={ showModal }
                setShowModal={ setShowModal }
                job_id={ id_to_delete }
                updateJobs={ updateJobs }
                token={ token }
            />
        </div>
    )
}

export default Jobs
