import { useState, useEffect } from "react";
import { Aluno } from ".."

export function ListarAlunosPage(){
    return(
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-1">Matriculas Acadêmicas</h2>
                <button className="btn btn-light">+ Nova Matrícula</button>
            </div>
        </div>
    );
}