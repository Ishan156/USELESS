import React from 'react';
import { Death } from '../../types';
import { Grave } from './Grave';

interface CemeteryGridProps {
  deaths: Death[];
}

export function CemeteryGrid({ deaths }: CemeteryGridProps) {
  return (
    <div className="relative w-full h-[650px] bg-[#090f09] border border-cemetery-border rounded-2xl overflow-hidden shadow-2xl fog-layer select-none">
      {/* Decorative trees on cemetery edges */}
      <div className="absolute top-4 left-6 text-3xl opacity-40 pointer-events-none">🌲</div>
      <div className="absolute top-8 left-24 text-2xl opacity-30 pointer-events-none">🌳</div>
      <div className="absolute top-4 right-8 text-3xl opacity-40 pointer-events-none">🌲</div>
      <div className="absolute top-12 right-28 text-2xl opacity-25 pointer-events-none">🌳</div>
      <div className="absolute bottom-6 left-8 text-3xl opacity-35 pointer-events-none">🌳</div>
      <div className="absolute bottom-4 right-10 text-3xl opacity-35 pointer-events-none">🌲</div>
      <div className="absolute bottom-10 left-32 text-2xl opacity-20 pointer-events-none">🌲</div>

      {/* Subtle Moon / Ambient glow */}
      <div className="absolute top-10 right-1/4 w-32 h-32 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-48 h-48 bg-cemetery-moss/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid crosshairs / pathways */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14201415_1px,transparent_1px),linear-gradient(to_bottom,#14201415_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Gravestones placed by coordinates */}
      {deaths.map((death) => (
        <Grave key={death.id} death={death} />
      ))}
    </div>
  );
}
