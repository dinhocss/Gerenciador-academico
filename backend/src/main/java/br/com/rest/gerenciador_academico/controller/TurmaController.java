package br.com.rest.gerenciador_academico.controller;

import br.com.rest.gerenciador_academico.model.Turma;
import br.com.rest.gerenciador_academico.model.Professor;
import br.com.rest.gerenciador_academico.repository.TurmaRepository;
import br.com.rest.gerenciador_academico.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import java.util.List;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/turmas")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping("/lista")
    public String listarTurmas(Model model) {
        model.addAttribute("turmas", turmaRepository.findAll());
        return "lista-turmas";
    }

    //Função que exibe o formulário para uma nova turma, exibindo os professores disponíveis.
    @GetMapping("/novo")
    public String exibirFormularioDeCadastro(Model model){
        List<Professor> professores = professorRepository.findAll();
        model.addAttribute("turma", new Turma());
        model.addAttribute("professores",professores);
        return "form-turma";
    }


    @PostMapping("/salvar")
    public String salvarTurma(@ModelAttribute("turma") Turma turma){
        turmaRepository.save(turma);
        return "redirect:/turmas/lista";
    }

    @GetMapping("/editar/{id}")
    public String exibirFormularioDeEdicao(@PathVariable Long id, Model model){
        Turma turma = turmaRepository.findById(id).orElseThrow(()->new IllegalArgumentException("ID da Turma inválido:" + id));
        List<Professor> professores = professorRepository.findAll();
        model.addAttribute("turma", turma);
        model.addAttribute("professores",professores);
        return "form-turma";
    }

    @GetMapping("/excluir/{id}")
    public String excluirTurma(@PathVariable Long id){
        turmaRepository.deleteById(id);
        return "redirect:/turmas/lista";
    }
}
