# TO-DO List

## Forget password

**Requisitos funcionais**

- [x] O usuário deve poder recuperar sua senha informando o e-mail;

- [ ] O usuário deve receber um e-mail instruindo a recuperação de senha;

- [ ] O usuário deve poder resetar sua senha;

**Requisitos não funcionais**

- [ ] Utilizar o `mailtrap` para testar envio de e-mail no ambiente de desenvolvimento;

- [ ] Utilizar o `Amazon SES` para envio em produção;

- [ ] O envio de e-mail deve acontecer em segundo plano (background job em fila);

**Regras de negócio**

- [ ] O Link de recuperação de senha enviado por e-mail deve expirar em 2 horas;

- [ ] O usuário precisa confirmar a nova senha ao restar

## User Update

**Requisitos funcionais**

- [ ] O usuário deve poder atualizar seus dados (nome, email e senha);

**Requisitos não funcionais**

- ...

**Regras de negócio**

- [ ] O usuário não pode alterar seu e-mail para um e-mail já utilizado;

- [ ] Para atualizar sua senha, o usuário deve informar a senha antiga;

- [ ] Para atualizar a senha, o usuário deve confirmar a senha antiga;

## Proivider dashboard

**Requisitos funcionais**

- [ ] O usuário deve poder listar seus agendamentos de um dia específico;

- [ ] O prestador deve receber uma notificação sempre que houver um novo agendamento;

- [ ] O prestador deve poder visualizar as notificações não lidas;

**Requisitos não funcionais**

- [ ] Os agendamentos do prestador do dia devem ser armazenados em cache;

- [ ] As notificações do prestador devem ser armazenadas no MongoDB;

- [ ] As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**Regras de negócio**

- [ ] A notificação deve ter um status lida ou não lida pra que o prestador possa controlar;

## Appointments Schedule

**Requisitos funcionais**

- [ ] O usuário deve poder listar todos os prestadores de serviço cadastrados;

- [ ] O usuário deve poder listar os dias de um mês com pelo o menos um horário disponível de um prestador;

- [ ] O usuário deve poder listar horários disponíveis de um dia específico de um prestador;

- [ ] O usuário deve poder realizar um novo agendamento com o prestador;

**Requisitos não funcionais**

- [ ] A listagem de prestadores deve ser armazenada em cache;

**Regras de negócio**

- [ ] Cada agendamento deve durar 1h exatamente;

- [ ] Os agendamentos devem estar disponíveis entre as 8h às 18h (primeiro às 8h, último às 17h);

- [ ] O usuário não pode agendar em um horário já oucupado;

- [ ] O usuário não pode agendar no passado;

- [ ] O usuário não pode agendar serviço para si mesmo;
