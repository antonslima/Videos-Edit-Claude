# Videos-Edit-Claude

Projeto de edição de vídeos (Reels 1080x1920) com Remotion. Responder ao usuário em português.

- Template principal: `src/Reel.tsx` (props em `reelSchemaDefaults`); composição registrada em `src/Root.tsx`.
- Mídias do usuário (vídeos de fundo, trilhas, logos) vão em `public/` e são usadas com `staticFile()`.
- Renderizar: `npm run render` → `out/reel.mp4` (o Chromium da nuvem é detectado em `remotion.config.ts`).
- Para conferir o layout, renderize um frame: `npx remotion still src/index.ts Reel out/frame.png --frame=60 --scale=0.4`.
- Envie o MP4 final ao usuário. `out/` não é versionado.
- Novos formatos de vídeo: crie um componente em `src/` e registre outra `<Composition>` em `src/Root.tsx`.
