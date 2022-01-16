import React from 'react'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// images and styles
import './JobCard.css'


function JobCard(props) {

    function handleDeleteJob() {
        props.setId_to_delete(props.id)
        props.setShowModal(true)
    }

    return (
        <div className="card" data-id={ props.id }>
            <div className="id column">{ props.id }</div>

            <div className="name column">
                { props.name }
            </div>

            <div className="deadline column">
                <span>Prazo</span>
                <p>
                    { props.remaining_days > 0 ?
                        `${ props.remaining_days } dias para a entrega`
                    :
                        'Prazo encerrado'
                    }
                </p>
            </div>

            <div className="amount column">
                <span>Valor</span>
                <p>R$ { props.budget.toFixed(2).replace('.', ',') }</p>
            </div>

            { props.remaining_days <= 0 ? (
                <div className="status badge column done">
                    Encerrado
                </div>
            ) : (
                <div className="status badge column progress">
                    Em andamento
                </div>
            )}

            <div className="actions column flex">
                <p className="sr-only">Ações</p>

                <Link
                    to={ `/edit-job/${ props.id }` }
                    className="button white edit"
                    title="Editar Job"
                >
                    <FiEdit3 size={ 25 } color="#ccc"/>
                </Link>

                <button
                    className="delete button white"
                    title="Excluir Job"
                    onClick={ handleDeleteJob }
                >
                    <FiTrash size={ 25 } color="#ccc"/>
                </button>
            </div>
        </div>
    )
}

export default JobCard
