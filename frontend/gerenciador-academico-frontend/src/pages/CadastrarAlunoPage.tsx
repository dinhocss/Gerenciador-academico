import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { createAluno } from "../services/alunoService"; 
import type { Aluno } from "../interfaces/aluno";


export function CadastrarAlunoPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<Aluno, 'id'>>({
        nome: '',
        email: '',
        matricula: '',
        ano: '',
        semestre:'',
        statusMatricula: 'ATIVA' 
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData(prevStatet => ({
            ...prevStatet,
            [name]: value
        }));
    };
    

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            console.log("Enviando para a API:", formData);
            await createAluno(formData);
            alert('Aluno cadastrado com sucesso!');
            navigate('\alunos');
        }catch(error){
            console.error("Erro ao cadastrar aluno:", error);
            alert('Não foi possível cadastrar o aluno.');
        }
    }

    return(
        <div className="Container">
            <h2 className="my-4">Cadastrar Novo Aluno</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome Completo</label>
                    <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange = {handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type ="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="matricula" className="form-label">Matrícula</label>
                    <input type="text" className="form-control" id="matricula" name="matricula" value={formData.matricula} onChange={handleChange} required/>
                </div>

                <button type="submit" className="btn btn-success">Salvar</button>
                <Link to="/alunos" className="btn btn-secondary ms-2">Cancelar</Link>
            </form>
        </div>
    )
}