package br.com.rest.gerenciador_academico.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Data
@Entity

public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;

    @OneToMany(mappedBy = "professor")
    private Set<Turma> turmas;
}
