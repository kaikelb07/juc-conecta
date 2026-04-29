#Requires -Version 5.1
<#
.SYNOPSIS
  Inicializa Git (se preciso), faz o primeiro commit e cria o repositório no GitHub ao teu lado (gh CLI).
.PARAMETER RepoName
  Nome do repositório na tua conta (por omissão: juc-conecta).
.PARAMETER Private
  Cria repositório privado em vez de público.
#>
param(
  [string]$RepoName = 'juc-conecta',
  [switch]$Private
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Este ficheiro vive em <projeto>/scripts/ — uma pasta acima é a raiz do projeto
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

function Test-Command {
  param([string]$Name)
  return [bool](Get-Command -Name $Name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command git)) {
  Write-Error 'Git não encontrado no PATH. Instala: https://git-scm.com/download/win e reabre o terminal.'
}

if (-not (Test-Command gh)) {
  Write-Error 'GitHub CLI (gh) não encontrado. Instala: https://cli.github.com/ e corre: gh auth login'
}

# Configuração recomendada (ajusta se já tiveres preferências globais)
if (-not (Test-Path '.git')) {
  & git init
  Write-Host '[OK] Repositório Git inicializado.'
}

$null = & git rev-parse --verify HEAD 2>&1
if ($LASTEXITCODE -ne 0) {
  # Evita erro se já existirem apenas ficheiros ignorados
  & git add -A
  $status = (& git status --porcelain)
  if ($status) {
    & git commit -m 'feat: projeto inicial Juc.Conecta'
    & git branch -M main
    Write-Host '[OK] Primeiro commit criado (branch main).'
  } else {
    Write-Host '[Aviso] Nada novo para commitar (ou só ignorados por .gitignore). O GitHub precisa de pelo menos um commit com ficheiros rastreados.'
  }
} else {
  Write-Host '[Info] Já há commits neste repo — vais só criar o remoto e enviar.'
}

if (& git remote 2>$null | Select-String -Pattern '^origin$' -Quiet) {
  Write-Host '[Info] O remote ''origin'' já existe. Para empurrar: git push -u origin main'
  exit 0
}

$pubArgs = if ($Private) { '--private' } else { '--public' }

Write-Host "A criar repositório ``$RepoName`` no GitHub (conta atual do ``gh``)..."
& gh repo create $RepoName $pubArgs '--source=.' '--remote=origin' '--push'
if ($LASTEXITCODE -ne 0) {
  throw 'O comando gh repo create falhou. Verifica gh auth login e se o nome do repo já não existe.'
}

Write-Host "`n[Lido] Repo: https://github.com/$(gh api user --jq '.login')/$RepoName"
