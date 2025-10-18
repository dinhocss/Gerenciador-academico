import { createBrowserRouter } from "react-router-dom";
import { ListarAlunosPage } from "../pages/ListarAlunosPage";
import { HomePage } from "../pages/HomePage";
import { ListarTurmasPage } from "../pages/ListarTurmasPage";
import { TurmaDetalhesPage } from "../pages/TurmaDetalhesPage";

import App from "../App";
import { CadastrarAlunoPage } from "../pages/CadastrarAlunoPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/alunos",
                element: <ListarAlunosPage />,
            },
            {
                path: "/turmas",
                element: <ListarTurmasPage />
            },
            {
                path: "/alunos/novo",
                element: <CadastrarAlunoPage />
            },
            {
                path: "/turmas/:id",
                element: <TurmaDetalhesPage/>
            },
            {
                path: "/turmas/novo"
            }

        ]
    }
]);