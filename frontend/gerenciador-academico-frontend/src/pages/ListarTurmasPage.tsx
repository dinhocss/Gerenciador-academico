import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Turma } from "../interfaces/turma";
import { getTurmas } from "../services/turmaService";

export function ListarTurmasPage(){
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const[filters, setFilters] = useState({
        ano: '',
        periodo: '',
        busca:''
    });

    const fetchTurmas = async () => {
        setLoading(true);
        try{
            const params: Record<string, string> = {};
            if(filters.ano) params.ano = filters.ano;
            if(filters.periodo) params.periodo = filters.periodo;
            if(filters.busca) params.busca = filters.busca;
            const data = await getTurmas(params);
            setTurmas(data);
        }catch(err){
            console.error(err);
            alert("Erro ao carregar turmas");
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchTurmas();
    },[]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]:value}));
    };

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        fetchTurmas();
    };

    const clearFilters = () => {
        setFilters({ano: "", periodo: "", busca: ""});
        fetchTurmas();
    };

    return(
        <div className="container py-4" style={{minHeight: "80vh"}}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-light">Lista de Turmas</h2>
                <div>
                    <Link to="/turmas/novo" className="btn btn-success me-2">Adicionar Turma</Link>
                </div>
            </div>

            <form className="card p-3 mb-3 bg-dark text-light" onSubmit={handleSearch}>
                <div className="row g-2">
                    <div>
                        <input name="ano" value={filters.ano} onChange={handleFilterChange} placeholder="Ano" className="form-control bg-secondary text-light border-0"/>
                    </div>
                    <div className="col-md-3">
                        <input name="periodo" value={filters.periodo} onChange={handleFilterChange} placeholder="Período (ex: 1, 2, etc.)" className="form-control bg-secondary text-light border-0"/>
                    </div>
                    <div className="col-md-4">
                        <input name="busca" value={filters.busca} onChange={handleFilterChange} placeholder="Busca por disciplina ou professor" className="form-control bg-secondary text-light border-0"/>
                    </div>
                    <div className="col-md-2 d-flex">
                        <button type="submit" className="btn btn-primary me-2">Pesquisar</button>
                        <button type="button" onClick={clearFilters} className="btn btn-outline-light">Limpar</button>
                    </div>
                </div>
            </form>

            <div className="card bg-dark text-light p-0">
                <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Ano</th>
                                <th>Período</th>
                                <th>Disciplina</th>
                                <th>Professor</th>
                                <th>Alunos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading?(
                                <tr><td colSpan={5}>Carregando...</td></tr>
                            ): turmas.length === 0 ? (
                                <tr><td colSpan={5}>Nenhuma turma encontrada</td></tr>
                            ) : (
                                turmas.map(t => (
                                    <tr key={t.id} style={{cursor: "pointer"}} onClick={()=> navigate(`/turmas/${t.id}`)}>
                                        <td>{t.ano}</td>
                                        <td>{t.periodo}</td>
                                        <td>{t.disciplina?.nome ?? "-"}</td>
                                        <td>{t.professor?.nome ?? "-"}</td>
                                        <td>{t.inscricoes ? t.inscricoes.length : 0}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}