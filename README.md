# VacinaKids 💉

Aplicação mobile/web para acompanhamento da jornada de vacinação infantil, desenvolvida como solução para o desafio técnico de uma plataforma de saúde infantil. Substitui parte da dependência da carteira física de vacinação, permitindo que pais e responsáveis acompanhem a situação vacinal de seus filhos de forma simples e visual.

## 🔗 Links

- **Aplicação publicada:** [https://vacina-kids-bec0f.web.app](https://vacina-kids-bec0f.web.app) 
- **Repositório:** [https://github.com/AnacAdad/vacina-kids.git]

## 📋 Sobre o projeto

O desafio propunha o desenvolvimento de um módulo de acompanhamento vacinal infantil, contemplando:

- Acompanhamento de múltiplas crianças por responsável
- Catálogo e histórico de vacinas
- Identificação visual de vacinas em dia, pendentes e atrasadas
- Exibição de campanhas de vacinação ativas
- Responsividade entre desktop, tablet e mobile

## 🧩 Cenários atendidos

| Cenário | Como foi resolvido |
|---|---|
| Vacinas previstas vs. realizadas | Tela de detalhe da criança lista todo o histórico vacinal, com status calculado dinamicamente (aplicada / pendente / atrasada) |
| Vacina com data prevista vencida | O status "atrasada" é calculado comparando a data prevista com a data atual sempre que os dados são exibidos, sem depender de um campo fixo no banco |
| Campanha de vacinação ativa | Tela de Campanhas calcula se cada campanha está dentro do período vigente e destaca visualmente as ativas |
| Múltiplos filhos com situações distintas | Cada criança possui registros de vacina vinculados pelo seu próprio `id`, exibidos de forma isolada na tela de detalhe — nenhum dado é compartilhado entre crianças |

## 🛠️ Stack técnica

- **Ionic Framework** (componentes standalone)
- **Angular** (standalone components, sem NgModules)
- **Firebase Firestore** — banco de dados em tempo real (NoSQL)
- **Firebase Hosting** — publicação da aplicação
- **RxJS** — composição reativa dos dados vindos do Firestore
- **SCSS** — estilização com variáveis de tema do Ionic


### Decisões de modelagem

- **Status vacinal calculado, não armazenado.** O status (`aplicada` / `pendente` / `atrasada`) nunca é salvo como campo fixo no banco — é derivado em tempo real a partir da data prevista, da data de aplicação (se houver) e da data atual. Isso evita que o dado fique desatualizado.
- **Coleções normalizadas.** `criancas`, `vacinas`, `registrosVacina` e `campanhas` são coleções independentes no Firestore, relacionadas por id (`criancaId`, `vacinaId`), similar a um modelo relacional — facilita consultas e evita duplicação de dados de catálogo (ex: informações da vacina não se repetem por criança).
- **Leitura reativa.** Todos os dados são lidos do Firestore como `Observable` (via `@angular/fire`), permitindo que a interface reaja automaticamente a qualquer mudança no banco, sem necessidade de recarregar a página manualmente.

## ✨ Funcionalidades adicionais (diferenciais)

- Cadastro de novas crianças e campanhas diretamente pela aplicação (modais), com escrita real no Firestore
- Cálculo automático de idade (anos e meses) a partir da data de nascimento
- Indicadores visuais consolidados (totais de vacinas aplicadas/pendentes/atrasadas) no painel de cada criança
- Ordenação cronológica do histórico vacinal e priorização de campanhas ativas nas listagens

## 🚀 Como executar localmente

### Pré-requisitos
- Node.js (LTS)
- Ionic CLI (`npm install -g @ionic/cli`)
- Uma conta e projeto no [Firebase](https://console.firebase.google.com) com Firestore habilitado

### Passos

```bash
# Clonar o repositório
git clone <https://github.com/AnacAdad/vacina-kids.git>
cd vacina-kids

# Instalar dependências
npm install

# Configurar Firebase
# Edite src/environments/environment.ts e environment.prod.ts
# com as credenciais do seu projeto Firebase (firebaseConfig)

# Rodar em modo desenvolvimento
ionic serve
```

### Popular o banco com dados de exemplo

O projeto inclui um `SeedService` (`src/app/services/seed.ts`) com dados de exemplo (duas crianças, catálogo de vacinas, registros e campanhas). Para popular seu Firestore, injete o serviço em qualquer página e chame `seedService.popularDados()` uma única vez.

### Build de produção

```bash
ionic build --prod
```

Os arquivos finais são gerados na pasta `www/`.


