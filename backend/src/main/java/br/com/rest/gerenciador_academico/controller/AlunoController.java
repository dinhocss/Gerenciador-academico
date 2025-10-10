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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;


//Classe que recebe e controla as requisições do navegador.
@RestController
@RequestMapping("/api/alunos") //Prefixo da URL
@CrossOrigin("http://localhost:5173")
public class AlunoController {

    @Autowired //Injeção de dependências
    private AlunoRepository alunoRepository;

    //Função para listar todos os alunos persistidos no banco de dados
    @GetMapping
    public List<Aluno> listarAlunos(){
        return alunoRepository.findAll();
    }

    //Função que exibe formulário para adição de um novo aluno
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id){
        return alunoRepository.findById(id).map(alunoEncontrado -> ResponseEntity.ok(alunoEncontrado)).orElse(ResponseEntity.notFound().build());
    }

    //A função que é acionada ao pressionar o botão "salvar"
    @PostMapping
    public Aluno salvarAluno(@RequestBody Aluno aluno){
        return alunoRepository.save(aluno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizarAluno(@PathVariable Long id, @RequestBody Aluno detalhesAluno){
        return alunoRepository.findById(id).map(alunoExistente -> {
            alunoExistente.setNome(detalhesAluno.getNome());
            alunoExistente.setEmail(detalhesAluno.getEmail());
            alunoExistente.setMatricula(detalhesAluno.getMatricula());
            Aluno alunoAtualizado = alunoRepository.save(alunoExistente);
            return ResponseEntity.ok(alunoAtualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirAluno(@PathVariable Long id){
        if(!alunoRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        alunoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
