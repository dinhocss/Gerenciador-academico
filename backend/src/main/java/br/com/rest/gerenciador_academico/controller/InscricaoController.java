package br.com.rest.gerenciador_academico.controller;

import br.com.rest.gerenciador_academico.model.Inscricao;
import br.com.rest.gerenciador_academico.repository.InscricaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Controller
@RequestMapping("/inscricoes")
public class InscricaoController {

    @Autowired
    private InscricaoRepository inscricaoRepository;

    @PostMapping
    public Inscricao criar(@RequestBody Inscricao inscricao){
        inscricao.setDataHora(LocalDateTime.now());
        return inscricaoRepository.save(inscricao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id){
        if(!inscricaoRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        inscricaoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
