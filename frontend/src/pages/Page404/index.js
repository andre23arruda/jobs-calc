import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// utils
import { title } from '../../utils/utils'

// images and styles
import './Page404.css'


function Page404() {
    title('Página não encontrada')

    return (
        <div className="container-404">
            <h1>
                Ooops! <br />
                Parece que essa página não existe
            </h1>

            <Link className="back-link" to='/jobs'>
                <FiArrowLeft size={ 30 } color='#ccc' />
                &nbsp;
                Voltar
            </Link>
        </div>
    )
}

export default Page404
