package br.com.rest.gerenciador_academico.controller;

import br.com.rest.gerenciador_academico.model.Professor;
import br.com.rest.gerenciador_academico.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
@RequestMapping("/professores")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping("/lista")
    public String listarProfessores(Model model){
        List<Professor> professores = professorRepository.findAll();
        model.addAttribute("professores", professores);
        return "lista-professores";
    }


    @GetMapping("/novo")
    public String exibirFormularioDeCadastro(Model model){
        model.addAttribute("professor", new Professor());
        return "form-professor";
    }

    @PostMapping("/salvar")
    public String salvarProfessor(@ModelAttribute("professor") Professor professor){
        professorRepository.save(professor);
        return "redirect:/professores/lista";

    }

    @GetMapping("/excluir/{id}")
    public String excluirProfessor(@PathVariable Long id){
        professorRepository.deleteById(id);
        return "redirect:/professores/lista";
    }

    @GetMapping("/editar/{id}")
    public String exibirFormularioDeEdicao(@PathVariable Long id, Model model){
        Professor professor = professorRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("ID do Professor inválido!" + id));
        model.addAttribute("professor", professor);
        return "form-professor";
    }
}

