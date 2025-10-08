package br.com.rest.gerenciador_academico.repository;
import br.com.rest.gerenciador_academico.model.Inscricao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
}
