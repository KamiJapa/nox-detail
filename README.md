# NOX DETAIL — Automotive Care Studio

Landing page conceitual de estética automotiva premium. Marca 100% fictícia; Campinas, SP é uma localização conceitual. Não há operação comercial, envio de dados, reservas, pagamentos ou vínculo com fabricantes.

## Abrir o projeto

O site pronto não precisa de instalação, build ou backend. Abra `index.html` após extrair o ZIP. Para uma prévia HTTP com os cabeçalhos de segurança, use Node.js 22 ou superior:

```sh
npm run preview
```

Acesse `http://127.0.0.1:4173`. O servidor é apenas uma ferramenta local de prévia e não faz parte da arquitetura publicada. Encerre com Ctrl+C.

## Estrutura

- `index.html`: landing page com as 13 seções solicitadas.
- `creditos.html`: créditos e transparência acessíveis pelo rodapé.
- `css/styles.css`: Tailwind e CSS personalizado compilados e minificados para produção.
- `src/styles.css`: fonte editável de estilos e tokens.
- `js/app.js`: fonte das interações em JavaScript puro; `js/app.min.js`: versão minificada usada pelo site.
- `js/config.js`: configuração pública e futura do WhatsApp, desativado por padrão.
- `assets/images`: fotografias reais otimizadas e derivadas por recorte.
- `assets/fonts`: Sora e Inter locais em WOFF2 variável.
- `assets/vendor`: GSAP, ScrollTrigger e um bundle local com apenas os 20 ícones Lucide utilizados.
- `assets/licenses`: avisos de licença de fontes e bibliotecas.
- `docs`: direção de arte, referências consultadas, revisão de segurança e registro de testes.
- `_headers`: cabeçalhos para hospedagens que suportam esse formato.
- `scripts/build.mjs`: geração do CSS; `scripts/serve.mjs`: prévia local.

## Editar e gerar o CSS

O HTML usa utilities Tailwind e classes próprias. Não há compilador Tailwind em tempo de execução. Para reconstruir o CSS a partir de `src/styles.css`:

```sh
npm ci
npm run build
npm run check
```

Node/npm só são necessários para manutenção e prévia, nunca no servidor de produção. Dependências são exclusivamente de desenvolvimento. Não foram utilizados React, Next.js, Vue, Three.js ou Canvas.

## Interações

1. Menu responsivo com Escape e estado expandido.
2. Precision Map com seis regiões, estados selecionados, painel anunciado e lista sincronizada. Na lista, use Tab, Enter/Espaço, setas, Home e End. No celular a lista substitui a interação com hotspots pequenos.
3. Comparador com range nativo: arraste, toque, use setas ou Home/End. A comparação é explicitamente uma simulação de contraste sobre uma mesma fotografia, não um resultado de serviço.
4. Galeria com filtros e lightbox. Escape fecha; setas navegam apenas pelos itens do filtro atual; foco retorna à foto de origem.
5. FAQ com elementos `details/summary`, funcional sem JavaScript.
6. Orçamento demonstrativo com validação, seleção contextual por serviço, resultado, download TXT e reset. Alterar escolhas invalida o resumo anterior. Não coleta dados pessoais nem usa localStorage.
7. GSAP/ScrollTrigger em reveals moderados, com respeito a `prefers-reduced-motion`. Conteúdo permanece visível quando bibliotecas não carregam.

## Preços e demonstração

O briefing proíbe inventar números comerciais e não fornece preços. Por isso o gerador produz um plano de cuidados e apresenta **“A definir em avaliação”** para investimento e prazo. Não há tabela fictícia disfarçada de oferta. Avaliações, certificações, quantidade de clientes e promessas de resultado não foram inventadas.

## WhatsApp futuro

Em `js/config.js`, mantenha `enabled: false` enquanto não houver uma operação real e um número expressamente autorizado. Quando autorizado, preencha `number` somente com dígitos internacionais (país + DDD + número) e mude `enabled` para `true`. Um link aparecerá apenas depois da simulação. O link abre o WhatsApp por decisão do visitante; não envia mensagens automaticamente. Atualize os textos de privacidade e os avisos do projeto antes de transformar a demonstração em negócio real. Nunca coloque tokens ou chaves no arquivo.

## Publicação estática

1. Extraia o ZIP e abra a pasta `nox-detail`.
2. Publique `index.html`, `creditos.html`, `favicon.svg`, `robots.txt`, `_headers`, `css/`, `js/` e `assets/` na raiz pública de uma hospedagem estática (por exemplo, GitHub Pages, Netlify ou Cloudflare Pages).
3. Não é necessário comando de build na hospedagem quando os arquivos compilados são enviados.
4. Use HTTPS e compressão gzip/Brotli para HTML, CSS e JavaScript. `_headers` funciona em hosts compatíveis; em outros, configure os mesmos cabeçalhos pelo painel. GitHub Pages não lê `_headers`.
5. Após definir um domínio real, adicione canonical, `og:url`, URL absoluta de `og:image` e sitemap com esse domínio. Não foi inventado um domínio para a demonstração. A imagem social incluída pode ser usada para Open Graph.
6. Teste novamente links, headers e performance no endereço final. Auditorias locais não garantem resultados idênticos na hospedagem.

Não publique `node_modules`, `.npm-cache`, arquivos de ferramentas ou credenciais. O site funciona também sob subdiretórios, pois todos os caminhos de assets são relativos.

## Créditos e limites

Leia `ASSET-CREDITS.md`, `docs/REFERENCIAS.md`, `docs/SEGURANCA.md` e `docs/TESTES.md`. As quatro imagens de referência mencionadas não estavam acessíveis nesta conversa; a implementação usa a direção consolidada pelo usuário e um conceito visual original. Não houve comparação com imagens indisponíveis.