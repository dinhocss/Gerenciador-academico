import { useState, useEffect } from "react";
import type { Aluno } from "../interfaces/aluno";
import { getAlunos } from "../services/alunoService";
import { BarraDeFiltros } from "../components/BarraDeFiltros";
import { Link } from "react-router-dom";

export function ListarAlunosPage(){
    const [termoBusca, setTermoBusca] = useState('');

    const [alunos,setAlunos] = useState<Aluno[]>([]);

    useEffect(()=>{
        getAlunos().then(dadosRecebidos=>{
            setAlunos(dadosRecebidos);
        });
    },[]);

    const alunosFiltrados = alunos.filter(aluno => aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()))

    return(
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-1">Matriculas Acadêmicas</h2>
                <Link to="/alunos/novo" className = "btn btn-dark">+ Nova Matricula</Link>
            </div>

            <BarraDeFiltros termoBusca={termoBusca} onBuscaChange={setTermoBusca} />

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Nome do Aluno</th>
                        <th>Email</th>
                        <th>Matrícula</th>
                        <th>Ano</th>
                        <th>Semestre</th>
                        <th>Status da Matricula</th>
                    </tr>
                </thead>
                <tbody>
                    {alunosFiltrados.map(aluno => (
                        <tr key={aluno.id}>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.matricula}</td>
                            <td>{aluno.ano}</td>
                            <td>{aluno.semestre}</td>
                            <td>{aluno.statusMatricula}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}