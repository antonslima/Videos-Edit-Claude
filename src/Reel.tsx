import React from 'react';
import {
  AbsoluteFill, Sequence, OffthreadVideo, Audio, staticFile,
  useCurrentFrame, useVideoConfig, spring, interpolate,
} from 'remotion';

export type ReelProps = {
  titulo: string;
  subtitulo: string;
  cenas: string[];        // um texto por cena
  cta: string;            // chamada final
  assinatura: string;     // ex.: @seuperfil
  corDestaque: string;
  videoFundo?: string;    // arquivo em /public (ex.: "fundo.mp4"), opcional
  musica?: string;        // arquivo em /public (ex.: "trilha.mp3"), opcional
  segundosPorCena: number;
};

export const reelSchemaDefaults: ReelProps = {
  titulo: '3 dicas rápidas',
  subtitulo: 'para editar vídeos com código',
  cenas: [
    'Cada vídeo é um componente React',
    'Troque textos e cores via props — sem refazer nada',
    'Renderize em MP4 com um único comando',
  ],
  cta: 'Salve para não esquecer',
  assinatura: '@seuperfil',
  corDestaque: '#22d3ee',
  segundosPorCena: 3,
};

const INTRO = 2.5, OUTRO = 3; // segundos
export const calcDuration = (p: ReelProps, fps = 30) =>
  Math.round((INTRO + p.cenas.length * p.segundosPorCena + OUTRO) * fps);

const Pop: React.FC<{children: React.ReactNode; delay?: number}> = ({children, delay = 0}) => {
  const f = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const s = spring({frame: f - delay, fps, config: {damping: 14}});
  const out = interpolate(f, [durationInFrames - 8, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <div style={{transform: `translateY(${(1 - s) * 80}px) scale(${0.9 + s * 0.1})`, opacity: Math.min(s, out)}}>
      {children}
    </div>
  );
};

const Centro: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 90, textAlign: 'center'}}>
    {children}
  </AbsoluteFill>
);

const font = 'Inter, "Helvetica Neue", Arial, sans-serif';

export const Reel: React.FC<ReelProps> = (p) => {
  const {fps, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  const intro = Math.round(INTRO * fps), cena = Math.round(p.segundosPorCena * fps);
  const progresso = frame / durationInFrames;

  return (
    <AbsoluteFill style={{background: 'linear-gradient(160deg,#0f172a,#1e293b 60%,#0b1120)', fontFamily: font, color: 'white'}}>
      {p.videoFundo && (
        <>
          <OffthreadVideo src={staticFile(p.videoFundo)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          <AbsoluteFill style={{background: 'rgba(0,0,0,0.45)'}} />
        </>
      )}
      {p.musica && <Audio src={staticFile(p.musica)} volume={0.4} />}

      <Sequence durationInFrames={intro}>
        <Centro>
          <Pop><div style={{fontSize: 120, fontWeight: 900, lineHeight: 1.05, color: p.corDestaque}}>{p.titulo}</div></Pop>
          <Pop delay={8}><div style={{fontSize: 56, marginTop: 30, opacity: 0.9}}>{p.subtitulo}</div></Pop>
        </Centro>
      </Sequence>

      {p.cenas.map((t, i) => (
        <Sequence key={i} from={intro + i * cena} durationInFrames={cena}>
          <Centro>
            <Pop><div style={{fontSize: 150, fontWeight: 900, color: p.corDestaque}}>{i + 1}</div></Pop>
            <Pop delay={6}><div style={{fontSize: 78, fontWeight: 800, lineHeight: 1.15, marginTop: 20}}>{t}</div></Pop>
          </Centro>
        </Sequence>
      ))}

      <Sequence from={intro + p.cenas.length * cena}>
        <Centro>
          <Pop><div style={{fontSize: 96, fontWeight: 900, lineHeight: 1.1}}>{p.cta}</div></Pop>
          <Pop delay={10}>
            <div style={{marginTop: 50, fontSize: 54, padding: '18px 44px', borderRadius: 999, background: p.corDestaque, color: '#0f172a', fontWeight: 800}}>
              {p.assinatura}
            </div>
          </Pop>
        </Centro>
      </Sequence>

      {/* barra de progresso */}
      <div style={{position: 'absolute', bottom: 0, left: 0, height: 14, width: `${progresso * 100}%`, background: p.corDestaque}} />
    </AbsoluteFill>
  );
};
