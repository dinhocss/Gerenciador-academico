package br.com.rest.gerenciador_academico.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor//Lombok (cria automaticamente alguns métodos)
@Entity
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String matricula;
    private String ano;
    private String semestre;
    private String statusMatricula;

    @ToString.Exclude
    @JsonManagedReference
    //Utilizado para fazer com que a relação de um aluno para muitas inscrições seja feita.
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Inscricao> inscricoes;
}
