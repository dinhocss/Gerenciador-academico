import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Turma } from "../interfaces/turma";
import { getTurmaById } from "../services/turmaService";

export function TurmaDetalhesPage(){
    const { id } = useParams<{ id: string}>();
    const [turma, setTurma] = useState<Turma | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(!id) return;
        (async ()=> {
            try{
                const data = await getTurmaById(Number(id));
                setTurma(data);
            }catch (err){
                console.error(err);
                alert("Erro ao carregar turma!");
            }finally{
                setLoading(false);
            }
        })();
    }, [id]);

    if(loading) return <div className="p-4 text-light">Carregando....</div>;
    if(!turma) return <div className="p-4 text-light">Turma não encontrada</div>;

    return(
        <div className="container py-4">
            <div className="card bg-dark text-light p-3">
                <div className="d-flex justify-content-between alight-items-center mb-3">
                    <h3>Turma: {turma.disciplina?.nome ?? "—"}</h3>
                    <Link to="turmas" className="btn btn-secondary">Voltar</Link>
                </div>

                <p><strong>Ano:</strong>{turma.ano}</p>
                <p><strong>Período:</strong>{turma.periodo}</p>
                <p><strong>Professor</strong>{turma.professor?.nome ?? "—"}</p>

                <h5 className="mt-4">Alunos Inscritos</h5>
                <div className="list-group bg-transparent">
                    {turma.inscricoes && turma.inscricoes.length > 0 ? (
                        turma.inscricoes.map((insc:any)=>(
                            <div key={insc.id ?? Math.random()} className="list-group-item bg-secondary text-light mb-1">
                                {insc.aluno?.nome ?? insc.alunoNome ?? "Aluno sem nome"}
                            </div>    
                        ))
                    ): (
                        <div className="text-light">Nenhum inscrito</div>
                    )}
                </div>
            </div>
        </div>
    )
}