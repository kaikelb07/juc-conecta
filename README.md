# Juc.Conecta

Site tipo “link na bio” do **Juc.Conecta** (Jovens Unidos em Cristo) — Next.js.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm start
```

## Publicação no GitHub

No PowerShell (na pasta do projeto), executa uma vez para autenticação GitHub CLI: `gh auth login`.

Depois:

```powershell
.\scripts\setup-github.ps1
```

Opcionalmente: `.\scripts\setup-github.ps1 -RepoName nome-do-repo -Private`.
