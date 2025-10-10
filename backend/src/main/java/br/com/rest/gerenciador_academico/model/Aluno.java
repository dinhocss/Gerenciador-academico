package br.com.rest.gerenciador_academico.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;


@Data //Lombok (cria automaticamente alguns métodos)
@Entity
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String matricula;

    //Utilizado para fazer com que a relação de um aluno para muitas inscrições seja feita.
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Inscricao> inscricoes;
}
