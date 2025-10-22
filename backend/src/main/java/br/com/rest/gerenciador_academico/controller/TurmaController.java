package br.com.rest.gerenciador_academico.controller;

import br.com.rest.gerenciador_academico.dto.TurmaDetalhesDTO;
import br.com.rest.gerenciador_academico.model.Aluno;
import br.com.rest.gerenciador_academico.model.Turma;
import br.com.rest.gerenciador_academico.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.ui.Model;

@RestController
@RequestMapping("/api/turmas")
@CrossOrigin("http://localhost:5173")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;

    @GetMapping
    public List<TurmaDetalhesDTO> listarTurmas(){
        List<Turma> todasAsTurmas = turmaRepository.findAllComDetalhes();

        return todasAsTurmas.stream().map(this::converterParaDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurmaDetalhesDTO> buscarPorId(@PathVariable Long id){
        return turmaRepository.findByIdComDetalhes(id).map(this::converterParaDTO).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    private TurmaDetalhesDTO converterParaDTO(Turma turma){
        TurmaDetalhesDTO dto = new TurmaDetalhesDTO();
        dto.setId(turma.getId());
        dto.setAno(turma.getAno());
        dto.setPeriodo(turma.getPeriodo());
        if(turma.getDisciplina() != null){
            dto.setNomeDisciplina(turma.getDisciplina().getNome());
        }
        if(turma.getProfessor()!=null){
            dto.setNomeProfessor(turma.getProfessor().getNome());
        }



        List<TurmaDetalhesDTO.AlunoSimplesDTO> alunosDTO = new ArrayList<>();
        if(turma.getInscricoes()!=null){
            alunosDTO = new ArrayList<>(turma.getInscricoes()).stream().filter(inscricao->inscricao != null && inscricao.getAluno() !=null).map(inscricao->{
                TurmaDetalhesDTO.AlunoSimplesDTO alunoDto = new TurmaDetalhesDTO.AlunoSimplesDTO();
                alunoDto.setId(inscricao.getAluno().getId());
                alunoDto.setNome(inscricao.getAluno().getNome());
                alunoDto.setEmail(inscricao.getAluno().getEmail());
                alunoDto.setMatricula(inscricao.getAluno().getMatricula());

                return alunoDto;
            }).collect(Collectors.toList());
        }

        dto.setAlunos(alunosDTO);

        return dto;
    }
}
