package br.com.rest.gerenciador_academico.repository;
import br.com.rest.gerenciador_academico.model.Aluno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long>{}