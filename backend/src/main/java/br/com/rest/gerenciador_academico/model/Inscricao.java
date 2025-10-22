package br.com.rest.gerenciador_academico.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EqualsAndHashCode(exclude = {"aluno", "turma"})
public class Inscricao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    //Diz que muitas inscrições podem estar associadas a um aluno.
    @ManyToOne
    @ToString.Exclude
    @JsonBackReference
    @JoinColumn(name = "aluno_id", nullable = false) //Adiciona uma chave estrangeira de nome aluno_id em Inscrição
    private Aluno aluno;

    @ToString.Exclude
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "turma_id", nullable = false)
    private Turma turma;
}
