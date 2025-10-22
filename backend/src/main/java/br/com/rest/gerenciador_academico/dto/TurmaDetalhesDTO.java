package br.com.rest.gerenciador_academico.dto;

import lombok.Data;
import java.util.List;

@Data
public class TurmaDetalhesDTO {
    private Long id;
    private String ano;
    private String periodo;
    private String nomeDisciplina;
    private String nomeProfessor;
    private List<AlunoSimplesDTO> alunos;

    @Data
    public static class AlunoSimplesDTO{
        private Long id;
        private String nome;
        private String email;
        private String matricula;
    }
}
