'use client';

import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { Box, List, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LocalizedLink, useLocalizedPathname } from '@code-sync/translations';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Text,
} from '@code-sync/ui';
import styles from './Navigation.module.css';

interface NavigationLinkProps {
  icon: LucideIcon;
  title: string;
  href: string;
  isHighlighted: boolean;
}

const NavigationLink = ({
  icon: Icon,
  title,
  href,
  isHighlighted,
}: Readonly<NavigationLinkProps>) => (
  <li>
    <Button variant="link" asChild>
      <LocalizedLink
        className={clsx(styles.link, isHighlighted && styles.linkHighlight)}
        href={href}
      >
        <Icon size={12} aria-hidden />
        <Text className={styles.text} as="span">
          {title}
        </Text>
      </LocalizedLink>
    </Button>
  </li>
);

export const Navigation = () => {
  const t = useTranslations('Navigation');
  const pathname = useLocalizedPathname();

  const links = [
    { title: t('links.explore'), icon: Box, href: `/explore` },
    { title: t('links.problems'), icon: List, href: `/problems` },
  ];

  return (
    <nav className={styles.navigation}>
      <ul className={styles.links}>
        {links.map(({ href, ...props }) => (
          <NavigationLink
            key={href}
            href={href}
            isHighlighted={pathname === href}
            {...props}
          />
        ))}
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className={styles.userMenuToggle}
          >
            <User size={14} aria-hidden />
            <span className="sr-only">{t('userMenu.toggleUserMenu')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent side="left" sideOffset={10}>
            <DropdownMenuLabel>
              <Text className={styles.userMenuLabel} as="span">
                {t('userMenu.menuLabel')}
              </Text>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/settings" className={styles.userMenuLink}>
                  <Text as="span">{t('userMenu.settings')}</Text>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/api/auth/logout" className={styles.userMenuLink}>
                  <Text as="span">{t('userMenu.logout')}</Text>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </nav>
  );
};
