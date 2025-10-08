package br.com.rest.gerenciador_academico.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Inscricao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    //Diz que muitas inscrições podem estar associadas a um aluno.
    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false) //Adiciona uma chave estrangeira de nome aluno_id em Inscrição
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "turma_id", nullable = false)
    private Turma turma;
}
