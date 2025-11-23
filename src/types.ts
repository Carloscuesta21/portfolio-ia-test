import { ReactNode } from "react";

export interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface PainPointItem {
  title: string;
  description: string;
  icon: ReactNode;
}
