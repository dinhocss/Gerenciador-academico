import type { Aluno } from "../interfaces/aluno";

const API_URL = "http://localhost:8080/api/alunos";

const alunosMock: Aluno[] = [
    {
        id: 1,
        nome: "Claudio Alberto Lopes Junior",
        email: "caljunior@id.uff.br",
        matricula:"1213231",
        ano: "2025",
        semestre: "2",
        statusMatricula: "ATIVA"
    },
    {
        id: 2,
        nome: "Pedro Guimarães Lima",
        email:"pedro@id.uff.br",
        matricula: "1419495",
        ano: "2024",
        semestre: "1",
        statusMatricula: "CANCELADA"
    },
    {
        id: 3,
        nome: "Luciana Gimenez Pamplona",
        email:"lucigimi@id.uff.br",
        matricula: "21471487",
        ano: "2023",
        semestre: "1",
        statusMatricula: "FINALIZADA"
    },
    {
        id: 4,
        nome: "Faíola de Paula Bonek",
        email: "bonequinha@id.uff.br",
        matricula: "9471240",
        ano: "2024",
        semestre: "2",
        statusMatricula: "TRANCADA"
    }
];

export const getAlunos = async (): Promise<Aluno[]> => {
    const response = await fetch(API_URL);
    if(!response.ok){
        throw new Error('rro ao buscar alunos da API');
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

