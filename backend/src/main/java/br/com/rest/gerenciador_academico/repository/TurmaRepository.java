// Em repository/TurmaRepository.java
package br.com.rest.gerenciador_academico.repository;

import br.com.rest.gerenciador_academico.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // Importe @Query
import org.springframework.data.repository.query.Param; // Importe @Param

import java.util.List;
import java.util.Optional;

public interface TurmaRepository extends JpaRepository<Turma, Long> {

    // --- NOVO MÉTODO PARA BUSCAR TODAS COM JOIN FETCH ---
    // Esta query busca todas as Turmas (t) e já traz junto (LEFT JOIN FETCH)
    // as Inscrições (i) e os Alunos (a) relacionados.
    // O LEFT JOIN garante que turmas sem inscrições também sejam retornadas.
    @Query("SELECT DISTINCT t FROM Turma t " +
            "LEFT JOIN FETCH t.inscricoes i " +
            "LEFT JOIN FETCH i.aluno a " +
            "LEFT JOIN FETCH t.professor " + // Traz o professor junto
            "LEFT JOIN FETCH t.disciplina") // Traz a disciplina junto
    List<Turma> findAllComDetalhes();


    // --- NOVO MÉTODO PARA BUSCAR UMA COM JOIN FETCH ---
    // Mesma lógica, mas buscando apenas uma turma pelo ID.
    @Query("SELECT t FROM Turma t " +
            "LEFT JOIN FETCH t.inscricoes i " +
            "LEFT JOIN FETCH i.aluno a " +
            "LEFT JOIN FETCH t.professor " +
            "LEFT JOIN FETCH t.disciplina " +
            "WHERE t.id = :id")
    Optional<Turma> findByIdComDetalhes(@Param("id") Long id);

}