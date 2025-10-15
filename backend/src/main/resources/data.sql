INSERT INTO ALUNO (nome, email, matricula, ano, semestre, status_matricula) VALUES ('Claudio Alberto Lopes Junior','caljunior@id.uff.br','1231414', '2025','2','ATIVA');
INSERT INTO ALUNO (nome, email, matricula, ano, semestre, status_matricula) VALUES ('Pedro Guimarães Lima', 'pedro@id.uff.br','94148455', '2025', '1', 'CANCELADA');
INSERT INTO ALUNO (nome, email, matricula, ano, semestre, status_matricula) VALUES ('Margareth Del Rey', 'margo@id.uff.br', '92184815', '2023', '2', 'TRANCADA');
INSERT INTO ALUNO (nome, email, matricula, ano, semestre, status_matricula) VALUES ('Priscilla Nosceti', 'pri@id.uff.br','1987495','2020','1','FINALIZADA');
INSERT INTO ALUNO (nome, email, matricula, ano, semestre, status_matricula) VALUES ('Veronica Costa', 'vcoco@id.uff.br','11312395','2021','2','FINALIZADA');
INSERT INTO PROFESSOR (nome, email) VALUES ('Dr. Ricardo Almeida', 'ricardo@escola.com');

INSERT INTO DISCIPLINA (nome, carga_horaria) VALUES ('Programação Orientada a Objetos', '80h');
INSERT INTO DISCIPLINA (nome, carga_horaria) VALUES ('Banco de Dados', '60h');

INSERT INTO TURMA (ano, periodo, professor_id, disciplina_id) VALUES ('2025', '1', 1, 1);
-- A segunda turma usa o professor com id=1 (Dr. Ricardo) e a disciplina com id=2 (BD)
INSERT INTO TURMA (ano, periodo, professor_id, disciplina_id) VALUES ('2025', '1', 1, 2);