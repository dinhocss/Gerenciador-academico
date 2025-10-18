export interface Turma{
    id: number;
    ano: String;
    periodo: String;
    professor?:{
        id: number;
        nome: String;
    } | null;
    disciplina?:{
        id: number;
        nome: String;
    } | null;
    inscricoes?: any[];
}