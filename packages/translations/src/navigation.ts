import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { localePrefix, locales } from './locale-helper';

export const {
  Link: LocalizedLink,
  redirect: localizedRedirect,
  useRouter: useLocalizedRouter,
  usePathname: useLocalizedPathname,
  permanentRedirect: localizedPermanetRedirect,
} = createSharedPathnamesNavigation({
  locales,
  localePrefix,
});
