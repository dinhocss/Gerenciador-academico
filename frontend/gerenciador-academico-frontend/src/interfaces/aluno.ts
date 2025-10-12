import type { StatusMatricula } from "./statusMatricula";

export interface Aluno{
    id: number;
    nome: string;
    email: string;
    matricula: string;
    ano: string;
    semestre: string;
    statusMatricula: StatusMatricula;
}