# Testes realizados — 10/10/2026

## Ambiente e escopo

- Windows, Chrome instalado, prévia em `http://127.0.0.1:4173/`.
- Inspeção inicial no navegador integrado do Codex. A aba deixou de persistir entre chamadas; as verificações reproduzíveis continuaram em Chrome headless com Playwright, conforme a alternativa autorizada pelo usuário.
- Desktop 1440×900, tablet 768×1024, mobile 390×844 e mobile estreito 320×740. Capturas de seções em desktop 1440×1000.
- Ferramentas de QA instaladas fora do projeto e não incluídas como dependências do site.
- Build Tailwind/minificação e verificação de sintaxe do JavaScript executados.

## Resultado funcional final

| Verificação | Resultado observado |
| --- | --- |
| Identidade e conteúdo | Título correto, um H1, 11 seções principais + header e footer; página não vazia |
| Arquitetura estática | HTML/CSS/JS, sem framework overlay, servidor de aplicação ou endpoint de formulário |
| Assets | Todas as imagens usadas carregaram; fontes Sora/Inter confirmadas |
| Navegação | Todos os destinos internos existem; retorno ao topo chega a scrollY 0 |
| Precision Map | Seis pontos sincronizam os seis botões da lista, título, descrição e CTA; setas e End testados |
| Comparador | Range nativo nos extremos 0/100, setas, atualização do percentual e recorte |
| Galeria | Todos os cinco filtros; contagens 6/2/1/2/1 conforme categoria |
| Lightbox | Abertura, próximo/anterior, setas, Escape, botão fechar, retorno do foco e estado com uma foto |
| FAQ | Abertura e fechamento das seis perguntas |
| Orçamento | Erro sem seleção, foco no campo, porte, múltiplos serviços, condição, resumo e reset |
| Download | TXT baixado e conteúdo validado contra os serviços selecionados |
| Alteração de escolhas | Invalida resumo anterior; nova geração usa as escolhas atuais |
| CTAs contextuais | Os seis cards e o CTA do mapa selecionam o serviço correspondente |
| WhatsApp | Link permanece oculto com a configuração padrão desativada |
| Privacidade | Modal abre e fecha por Escape |
| Responsividade | Sem overflow horizontal nos quatro viewports; menu e formulário testados em tablet/mobile |
| Movimento | GSAP/ScrollTrigger testados com movimento normal e `prefers-reduced-motion: reduce` |
| Sem JavaScript | Conteúdo principal visível; FAQ nativo funciona |
| Sem servidor | Abertura via `file://`, mapa funcional, fontes carregadas e sem erro de JavaScript |
| Console e rede | Zero erros de JS/console, zero respostas 4xx/5xx no fluxo, zero requests externos do site |

## Acessibilidade automatizada

axe-core, tags WCAG 2 A/AA, WCAG 2.1 A/AA e WCAG 2.2 AA: **zero violações detectadas no estado final em desktop e mobile**. Um `aria-label` em grupo sem role foi encontrado no primeiro teste e corrigido. Nomes acessíveis de marca e galeria foram alinhados ao texto visível. Também foram verificadas interações por teclado, foco após validação e retorno de foco do lightbox.

Testes automatizados não equivalem a certificação de acessibilidade. Não houve sessão manual com NVDA, VoiceOver ou JAWS.

## Lighthouse local

| Categoria | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 95 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |

Mobile: FCP 1,4 s, LCP 2,3 s, TBT 150 ms, CLS 0. Valores de uma execução local, com simulação mobile padrão do Lighthouse; variam por máquina, rede e hospedagem. Não são dados reais de usuários. A auditoria inicial de performance foi 73; otimizações reduziram Lucide de cerca de 358 KB para 9 KB, minificaram o JS, adicionaram variantes responsivas das fotos e compressão HTTP na prévia. As auditorias finais precederam apenas a remoção dos rótulos ARIA redundantes da marca, alteração conferida pela suíte final.

## Revisão visual

Conceito original gerado para este projeto comparado às capturas da implementação por inspeção de imagens. Foram conferidos: (1) hierarquia Sora/Inter e escala do hero; (2) paleta exata; (3) fotografia e separação entre texto e veículo; (4) botões, foco e estados; (5) proporção do mapa e painel; (6) ritmo entre seções; (7) galeria assimétrica; (8) legibilidade mobile.

Desvios intencionais do conceito: fotografias reais licenciadas em vez das imagens ilustrativas geradas; ausência de alegações de resultados e de instalações reais; conteúdo de orçamento sem preço inventado; contraste escuro nos botões azuis para legibilidade; seis regiões conforme o briefing. As quatro referências originais não estavam acessíveis, portanto não foram usadas como evidência de comparação.

## Limites da validação

- Não testado em Safari, Firefox, iOS/Android físicos ou leitores de tela.
- Não publicada uma URL remota; cabeçalhos e performance precisam ser conferidos no host final.
- Sem teste de envio WhatsApp: não existe número autorizado; link desativado.
- Comparador ilustrativo, não evidência de serviço real.
- Não existe precificação comercial: gerador organiza um plano demonstrativo com investimento a definir.

## Reproduzir verificações básicas

```sh
npm ci
npm run build
npm run check
npm run preview
```

As suítes Playwright/axe e capturas foram mantidas na pasta de QA externa ao projeto. O ZIP contém o site, fontes de edição e esta documentação; não contém caches, node_modules, logs nem navegadores.
