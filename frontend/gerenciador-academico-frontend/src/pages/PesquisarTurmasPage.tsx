import { useState, useEffect } from 'react';
import type { Turma } from '../interfaces/turma';
import { getTurmas, getTurmaById } from '../services/turmaService';
import type { TurmaDetalhes, AlunoSimples } from '../services/turmaService';
import { Paginacao } from '../components/Paginacao';
import { Link } from 'react-router-dom';

export function PesquisaTurmasPage(){
    const[termoBusca, setTermoBusca] = useState('');
    const[todasAsTurmas, setTodasAsTurmas] = useState<TurmaDetalhes[]>([]);
    const[turmasFiltradas, setTurmasFiltradas] = useState<TurmaDetalhes[]>([]);
    const[turmaSelecionada, setTurmaSelecionada] = useState<TurmaDetalhes | null>(null);
    const[loading, setLoadingTurmas] = useState(false);

    const[paginaAtual, setPaginaAtual] = useState(1);
    const ITENS_POR_PAGINA = 5;

    useEffect(()=>{
        setLoadingTurmas(true);
        getTurmas().then(data=>{
            setTodasAsTurmas(data);
            setTurmasFiltradas(data);
        }).catch(err=>{
            console.error("Erro ao buscar turmas da API:",err);
            alert("Não foi possível carregar as turmams do servidor.");
        }).finally(()=>setLoadingTurmas(false));
    }, []);

    useEffect(()=>{
        if(termoBusca.trim()===''){
            setTurmasFiltradas(todasAsTurmas);
            setTurmaSelecionada(null);
            return;
        }

        const filtradas = todasAsTurmas.filter(turma=>turma.nomeDisciplina.toLowerCase().includes(termoBusca.toLowerCase()) || `A${turma.id.toString().padStart(3,'0')}`.toLowerCase().includes(termoBusca.toLowerCase()));
        setTurmasFiltradas(filtradas);
    },[termoBusca, todasAsTurmas]);

    const handleTurmaClick = (turma: TurmaDetalhes) => {
        console.log("Turma selcionada", turma);
        setTurmaSelecionada(turma);
        setPaginaAtual(1);
    };

    const alunosDaTurma: AlunoSimples[] = turmaSelecionada?.alunos ?? [];
    const totalPaginas = Math.ceil(alunosDaTurma.length / ITENS_POR_PAGINA);
    const indiceInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const indiceFinal = indiceInicial + ITENS_POR_PAGINA;
    const alunosPaginados = alunosDaTurma.slice(indiceInicial, indiceFinal);
    console.log("Estado atual de turmaSelecionada:", turmaSelecionada);
    console.log("Estado atual de turmaSelecionada (antes do render):", turmaSelecionada);
    console.log("Renderizando alunosDaTurma:", alunosDaTurma);
    console.log("Renderizando alunosPaginados:", alunosPaginados);
    if (turmaSelecionada) {
      console.log("Renderizando Professor:", turmaSelecionada.nomeProfessor);
    }
    return(
        <div className="container mt-4">
            {}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Pesquisa de Turmas</h2>
                <Link to="/turmas/novo" className="btn btn-success btn-dark">+ Adicionar Turma</Link>
            </div>
            {}
            <div className="mb-3">
                <input type="text" className="form-control form-control-lg" placeholder="Pesquise por uma turma (ex: A001 ou Programação...)" value={termoBusca} onChange={(e)=>setTermoBusca(e.target.value)}/>
            </div>
            {}

            {}
            <div className="row">
                {}
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Turmas Encontradas
                        </div>
                        <ul className="list-group list-group-flush" style={{height: '60vh', overflowY: 'auto'}}>
                            {loading && <li className="list-group-item">Carregando...</li>}
                            {!loading && turmasFiltradas.length === 0 && termoBusca.trim() !== '' && (
                                <li className="list-group-item">Nenhuma turma encontrada.</li>
                            )}
                            {!loading && termoBusca.trim() === '' &&(
                                <li className="list-group-item text-muted">Digite algo na busca para ver as turmas.</li> 
                            )}
                            {turmasFiltradas.map(turma=>(
                                <li key={turma.id} className={`list-group-item list-group-item-action ${turmaSelecionada?.id === turma.id ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={()=>handleTurmaClick(turma)}>
                                    {}
                                    A{turma.id.toString().padStart(3,'0')} - {turma?.nomeDisciplina}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {}
                <div className="col-md-8">
                    {turmaSelecionada ? (
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <span>Detalhes da Turma: A{turmaSelecionada.id.toString().padStart(3,'0')}</span>
                                <span>{turmaSelecionada?.nomeDisciplina}</span>
                            </div>
                            <div className="card-body">
                                <p><strong>Ano/Período:</strong>{turmaSelecionada.ano}/{turmaSelecionada.periodo} | <strong>Professor:</strong> {turmaSelecionada?.nomeProfessor}</p>
                                <hr/>
                                <h5 className="mb-3">Alunos Inscritos ({alunosDaTurma.length})</h5>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Matrícula</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alunosPaginados.map(aluno=>(
                                            <tr key={aluno.id}>
                                                <td>{aluno.id}</td>
                                                <td>{aluno.nome}</td>
                                                <td>{aluno.email}</td>
                                                <td>{aluno.matricula}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {totalPaginas > 1 && (
                                    <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} onPageChange={setPaginaAtual}/>
                                )}
                            </div>
                        </div>
                    ):(
                        <div className="card d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
                            <div className="text-center text-muted">
                                <p>Selecione uma turma à esquerda para ver os detalhes e a lista de alunos.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}