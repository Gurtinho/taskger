import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <>
            <h1>Taskger</h1>
            <p></p>
            <Link to='/signin'>Faça o login</Link>
            <Link to='/signup'>Criar uma conta</Link>
        </>
    )
}