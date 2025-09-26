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


@Controller
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping("/lista")
    public String listarAlunos(Model model){
        List<Aluno> alunos = alunoRepository.findAll();
        model.addAttribute("alunos", alunos);
        return "lista-alunos";
    }

    @GetMapping("/novo")
    public String exibirFormularioDeCadastro(Model model){
        model.addAttribute("aluno", new Aluno());
        return "form-aluno";
    }

    @PostMapping("/salvar")
    public String salvarAluno(@ModelAttribute("aluno") Aluno aluno){
        alunoRepository.save(aluno);
        return "redirect:/alunos/lista";
    }

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
