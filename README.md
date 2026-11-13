# CONVIVA

PWA responsivo para descobrir encontros e experiências na comunidade. O projeto é uma aplicação estática, sem dependências de build.

## Como executar

Sirva os arquivos com qualquer servidor HTTP local. Por exemplo:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`. O service worker e a instalação PWA exigem HTTPS em produção (ou `localhost` durante o desenvolvimento).

## O que já funciona

- Interface responsiva para desktop e celular, com navegação inferior em telas pequenas.
- Busca por encontros e filtros por categoria.
- Ação local de confirmação de presença e mensagens de retorno.
- Manifest e cache do shell para acesso offline após a primeira visita.
- Instalação compatível com navegadores que oferecem o evento de instalação PWA.

Os encontros e confirmações são demonstrativos e não são sincronizados com um servidor.
