import type { Turma } from "../interfaces/turma";

export interface AlunoSimples{
    id: number;
    nome: string;
    email: string;
    matricula: string;
}

export interface TurmaDetalhes{
    id: number;
    ano: string;
    periodo: string;
    nomeDisciplina: string;
    nomeProfessor: string;
    alunos: AlunoSimples[];
}

const API_URL = "http://localhost:8080/api/turmas";

export const getTurmas = async (): Promise<TurmaDetalhes[]> =>{
    const response = await fetch(API_URL);
    if(!response.ok){
        console.error("Erro na resposta da API:", response.status, response.statusText);
        throw new Error('Erro ao buscar turmas da API');
    }
    try{
        const data = await response.json();
        return data;
    }catch (error){
        console.error("Erro ao processar JSON:", error);
        throw new Error('Erro ao processar dados das turmas');
    }
};

export const getTurmaById = async (id: string): Promise<TurmaDetalhes> =>{
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok){
        console.error("Erro na resposta da API:", response.status, response.statusText);
        throw new Error('Erro ao buscar turma da API');
    }
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Erro ao processar JSON:", error);
        throw new Error('Erro ao processar dados da turma');
    }
};