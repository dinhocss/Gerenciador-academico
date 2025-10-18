import type { Turma } from "../interfaces/turma";

const API_URL = "http://localhost:8080/api/turmas";

export const getTurmas = async (params?: Record<string, string>): Promise<Turma[]> =>{
    const qs = params ?("?" + new URLSearchParams(params)).replace(/\+/g, "%20"): "";
    const response = await fetch(API_URL + qs);
    if(!response.ok){
        throw new Error('Erro ao buscar turmas da API');
    }
    return await response.json();
};

export const getTurmaById = async (id: number): Promise<Turma> =>{
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok){
        throw new Error('Erro ao buscar turma da API');
    }
    return await response.json();
};