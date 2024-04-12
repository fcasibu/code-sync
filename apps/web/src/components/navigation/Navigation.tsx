import type { LucideIcon } from 'lucide-react';
import { Box, MessageCircle, User, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
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
}

const NavigationLink = ({
  icon: Icon,
  title,
  href,
}: Readonly<NavigationLinkProps>) => (
  <li>
    <Button variant="link" asChild>
      <Link className={styles.link} href={href}>
        <Icon size={12} />
        <Text className={styles.text} as="span">
          {title}
        </Text>
      </Link>
    </Button>
  </li>
);

export const Navigation = () => {
  const t = useTranslations('Navigation');

  const links = [
    { title: t('links.projects'), icon: Box, href: '/' },
    { title: t('links.members'), icon: Users, href: '/' },
    { title: t('links.chat'), icon: MessageCircle, href: '/' },
  ];

  return (
    <nav className={styles.navigation}>
      <ul className={styles.links}>
        {links.map(({ icon: Icon, title, href }) => (
          <NavigationLink key={title} icon={Icon} title={title} href={href} />
        ))}
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className={styles.userMenuToggle}
          >
            <User size={14} />
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
