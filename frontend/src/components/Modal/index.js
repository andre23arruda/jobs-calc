import React from 'react'
import { FiTrash } from 'react-icons/fi'

// utils
import { deleteApi } from '../../services/api'

// images and styles
import './Modal.css'


function Modal({ job_id, showModal, setShowModal, updateJobs, token }) {
    function deleteJob(event) {
        event.preventDefault()
        deleteApi(`jobs/${ job_id }/`, token)
        .then(({response_status}) => {
            if (200 <= response_status < 300)
                updateJobs()
                setShowModal(false)
        })
    }

    return (
        <div className={ 'modal-wrapper ' + (showModal ? 'on' : '') }>
            <div className="modal">
                <FiTrash size={ 50 } color="#ccc"/>

                <h3>Excluir Job</h3>

                <p>
                    Quer mesmo excluir esse job?
                    <br/>
                    Ele será apagado para sempre.
                </p>

                <footer>
                    <button
                        className="button gray"
                        onClick={ () => setShowModal(false) }
                    >
                        Cancelar
                    </button>

                    <button
                        className="button red"
                        type="submit"
                        form="delete-job"
                        onClick={ () => setShowModal(false) }
                    >
                        Excluir Job
                    </button>
                </footer>
            </div>

            <form
                action="/job/delete"
                id="delete-job"
                onSubmit={ deleteJob }
            >
            </form>
        </div>

    )
}

export default Modal
