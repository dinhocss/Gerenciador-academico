package br.com.rest.gerenciador_academico.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Disciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cargaHoraria;
}
