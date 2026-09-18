type IconProps = { size?: number; className?: string };
const base = (size: number, className?: string) => ({ width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round" as const, strokeLinejoin:"round" as const, className, "aria-hidden":true });
export const Sparkle = ({size=24,className}:IconProps) => <svg {...base(size,className)}><path d="m12 3-1.4 4.2a5 5 0 0 1-3.2 3.2L3 12l4.4 1.6a5 5 0 0 1 3.2 3.2L12 21l1.4-4.2a5 5 0 0 1 3.2-3.2L21 12l-4.4-1.6a5 5 0 0 1-3.2-3.2Z"/></svg>;
export const HomeIcon = ({size=22}:IconProps) => <svg {...base(size)}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>;
export const Bag = ({size=22}:IconProps) => <svg {...base(size)}><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
export const Calendar = ({size=22}:IconProps) => <svg {...base(size)}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>;
export const User = ({size=22}:IconProps) => <svg {...base(size)}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
export const Arrow = ({size=18}:IconProps) => <svg {...base(size)}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>;
export const Clock = ({size=18}:IconProps) => <svg {...base(size)}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
