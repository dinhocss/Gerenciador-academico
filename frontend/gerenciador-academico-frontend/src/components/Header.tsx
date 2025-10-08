import { Link } from 'react-router-dom';

export function Header(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Gerenciador Acadêmico</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/alunos">Alunos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/turmas">Turmas</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}