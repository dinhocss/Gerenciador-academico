import type { Aluno } from "../interfaces/aluno";

const API_URL = "http://localhost:8080/api/alunos";

export const getAlunos = async (): Promise<Aluno[]> => {
    const response = await fetch(API_URL);
    if(!response.ok){
        throw new Error('Erro ao buscar alunos da API');
    }
    const data = await response.json();
    return data;
}

export const createAluno = async (alunoData: Omit<Aluno, 'id'>): Promise<Aluno> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alunoData)
    });

    if(!response.ok){
        throw new Error('Erro ao cadastrar o aluno');
    }

    return await response.json();
}

