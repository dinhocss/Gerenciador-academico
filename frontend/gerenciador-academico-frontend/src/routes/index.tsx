import { createBrowserRouter } from "react-router-dom";
import { ListarAlunosPage } from "../pages/ListarAlunosPage";
import { HomePage } from "../pages/HomePage";
import { ListarTurmasPage } from "../pages/ListarTurmasPage";

import App from "../App";

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
            }
        ]
    }
]);