import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n)

export type Tier = "Premium" | "Standard" | "Basic"

export const getPatchouliTier = (pa: number): Tier =>
  pa >= 32 ? "Premium" : pa >= 28 ? "Standard" : "Basic"

export const getTierColorClass = (tier: Tier) =>
  tier === "Premium"
    ? "bg-valam-gold/20 text-[#855F0D] border-valam-gold/40"
    : tier === "Standard"
    ? "bg-[#F4F4F5] text-[#27272A] border-[#E4E4E7]"
    : "bg-[#FAF6F0] text-[#6B4423] border-[#F0E5D8]"

export const isVerified = (status: string) => status === "VERIFIED" || status === "APPROVED"
