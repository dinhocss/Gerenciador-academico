package br.com.rest.gerenciador_academico.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;


@Data //para que serve?
@Entity
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Inscricao> inscricoes;
}
