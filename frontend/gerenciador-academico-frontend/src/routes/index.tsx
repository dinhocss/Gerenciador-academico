import { createBrowserRouter } from "react-router-dom";
import { ListarAlunosPage } from "../pages/ListarAlunosPage";
import { HomePage } from "../pages/HomePage";



import App from "../App";
import { CadastrarAlunoPage } from "../pages/CadastrarAlunoPage";
import { PesquisaTurmasPage } from "../pages/PesquisarTurmasPage";

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
                element: <PesquisaTurmasPage />
            },
            {
                path: "/alunos/novo",
                element: <CadastrarAlunoPage />
            },
            {
                path: "/turmas/novo"
            }

        ]
    }
]);