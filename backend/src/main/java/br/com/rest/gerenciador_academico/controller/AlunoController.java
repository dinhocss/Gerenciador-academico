package br.com.rest.gerenciador_academico.controller;

import br.com.rest.gerenciador_academico.model.Aluno;
import br.com.rest.gerenciador_academico.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;


//Classe que recebe e controla as requisições do navegador.
@Controller
@RequestMapping("/alunos") //Prefixo da URL
public class AlunoController {

    @Autowired //Injeção de dependências
    private AlunoRepository alunoRepository;

    //Função para listar todos os alunos persistidos no banco de dados
    @GetMapping("/lista")
    public String listarAlunos(Model model){
        List<Aluno> alunos = alunoRepository.findAll();
        model.addAttribute("alunos", alunos);
        return "lista-alunos"; //Exibe o arquivo HTML lista-alunos da pasta templates
    }

    //Função que exibe formulário para adição de um novo aluno
    @GetMapping("/novo")
    public String exibirFormularioDeCadastro(Model model){
        model.addAttribute("aluno", new Aluno());
        return "form-aluno"; //Outra página HTML contendo o formulário para entrada de dados
    }

    //A função que é acionada ao pressionar o botão "salvar"
    @PostMapping("/salvar")
    public String salvarAluno(@ModelAttribute("aluno") Aluno aluno){
        alunoRepository.save(aluno);
        return "redirect:/alunos/lista";
    }

    //Exclui um id específico que será passado como parâmetro
    @GetMapping("/excluir/{id}")
    public String excluirAluno(@PathVariable Long id){
        alunoRepository.deleteById(id);
        return "redirect:/alunos/lista";
    }

    @GetMapping("/editar/{id}")
    public String exibirFormularioDeEdicao(@PathVariable Long id, Model model){
        Aluno aluno = alunoRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID do Aluno inválido!" + id));
        model.addAttribute("aluno",aluno);
        return "form-aluno";
    }
}
