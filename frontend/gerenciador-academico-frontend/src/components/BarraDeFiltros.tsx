export function BarraDeFiltros(){
    return(
        <div className="card mb-4">
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-12">
                        <input type="text" className="form-control" placeholder="Informe o nome do aluno e pressione enter."/>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option selected>2025</option>
                            <option>2024</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option selected>Todos os meses</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option selected>Matriculados</option>
                            <option>Cancelados</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}