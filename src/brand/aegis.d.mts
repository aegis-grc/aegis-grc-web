export const MARK_VIEWBOX: string;
export const WORD: { w: number; h: number; d: string };
export const LOCKUP: { viewBox: string; wordX: number; wordY: number };
export const markDefs: string;
export const wordDefs: string;
export const simpleDefs: string;
export const markBody: string;
export const markMono: string;
export const markSimple: string;
export function lockupSvg(opts?: {
  dark?: boolean;
  mono?: boolean;
  height?: number;
  color?: string;
}): string;
export function markSvg(opts?: {
  simple?: boolean;
  mono?: boolean;
  height?: number;
  color?: string;
}): string;
