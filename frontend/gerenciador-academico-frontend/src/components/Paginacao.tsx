interface PaginacaoProps{
    paginaAtual: number;
    totalPaginas: number;
    onPageChange: (pagina: number) => void;
}

export function Paginacao({paginaAtual, totalPaginas, onPageChange}: PaginacaoProps){
    if(totalPaginas <= 0){
        return null;
    }

    const paginas = Array.from({length: totalPaginas}, (_, i) => i + 1);

    return(
        <nav aria-label="Navegação de página">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaAtual==1?'disabled':''}`}>
                    <button className="page-link" onClick={()=> onPageChange(paginaAtual-1)}>
                        Anterior
                    </button>
                </li>
                {paginas.map(p=>(
                    <li key={p} className={`page-item ${p === paginaAtual ? 'active' : ''}`}>
                        <button className="page-link" onClick={()=> onPageChange(p)}>
                            {p}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={()=> onPageChange(paginaAtual+1)}>
                        Próximo
                    </button>
                </li>
            </ul>
        </nav>
    );
}