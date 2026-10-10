# Revisão para hospedagem estática

- Sem backend, banco, autenticação, upload, pagamento ou endpoint de envio.
- Nenhum segredo, token, chave de API ou número de telefone real no código.
- Nenhum analytics, cookie, localStorage, sessionStorage ou service worker.
- Seleções do formulário existem apenas em memória; reload descarta tudo.
- Entradas são seleções predefinidas; os resultados são inseridos com `textContent`, `createElement` e `replaceChildren`, sem interpolar HTML de usuários.
- Links de WhatsApp são gerados apenas com `enabled === true` e número validado por expressão regular de dígitos internacionais; texto codificado por `encodeURIComponent`.
- Links externos abertos em nova aba têm `rel="noopener noreferrer"`.
- Fontes, fotografias, JS e CSS locais. Não existem requests de terceiros durante a navegação normal.
- CSP bloqueia scripts de terceiros e inline, objetos, conexões de rede externas e envio de formulários. `connect-src 'self'` permite apenas consultas à própria origem (incluindo a leitura de robots.txt por ferramentas de auditoria); o aplicativo não faz fetch. `style-src 'unsafe-inline'` é necessário aos estilos dinâmicos de GSAP e ao comparador; não autoriza scripts inline. `data:` permitido apenas para imagens.
- Anti-framing exige cabeçalho HTTP; `_headers` e o servidor de prévia incluem `frame-ancestors 'none'` e `X-Frame-Options: DENY`. Uma meta tag não substitui esses cabeçalhos.
- `nosniff`, política de referência e restrição de câmera/microfone/localização incluídos.
- Servidor de prévia limitado a loopback, leitura de arquivos do próprio projeto, métodos GET/HEAD; rejeita traversal e caminhos ocultos/node_modules. Não é servidor de produção.
- Dependências de build não integram runtime da hospedagem. Preserve e reavalie versões e licenças ao atualizar.

Antes de publicar: aplicar HTTPS, verificar cabeçalhos no host real, publicar apenas os assets necessários e revisar qualquer futura integração comercial. Os testes desta entrega são locais; não constituem auditoria do provedor de hospedagem.
