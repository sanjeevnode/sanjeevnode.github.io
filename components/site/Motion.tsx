'use client';
import { Engine } from '@/engine/next';
import { setupMotion } from '@/motion/setup';

export default function Motion() {
  return <Engine setup={setupMotion} />;
}
