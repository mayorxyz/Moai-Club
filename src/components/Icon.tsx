// Edit here: Icon component
import {
  AlertTriangle, Check, Wallet, Link as LinkIcon, Copy, ExternalLink, Lock,
  ShieldCheck, Sparkles, Clock, Gift, Users, HelpCircle, Activity, Gem,
  Settings, Download, Share2, XCircle, Info
} from 'lucide-react';

type IconName = 'warning' | 'success' | 'check' | 'wallet' | 'link' | 'copy' | 'external' |
  'lock' | 'gated' | 'shield' | 'security' | 'mint' | 'time' | 'countdown' | 'gift' | 'perks' |
  'community' | 'help' | 'activity' | 'rarity' | 'admin' | 'download' | 'share' | 'error' | 'info';

const iconMap: Record<IconName, React.ComponentType<any>> = {
  warning: AlertTriangle, success: Check, check: Check, wallet: Wallet, link: LinkIcon,
  copy: Copy, external: ExternalLink, lock: Lock, gated: Lock, shield: ShieldCheck,
  security: ShieldCheck, mint: Sparkles, time: Clock, countdown: Clock, gift: Gift,
  perks: Gift, community: Users, help: HelpCircle, activity: Activity, rarity: Gem,
  admin: Settings, download: Download, share: Share2, error: XCircle, info: Info,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" />;
}

export type { IconName };
