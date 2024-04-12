const sizes = {
  sm: '639px',
  md: '767px',
  lg: '1023px',
};

type Size = keyof typeof sizes;

export const media = {
  lessThan(size: Size) {
    return `(max-width: ${sizes[size]})`;
  },
  between(left: Size, right: Size) {
    return `${media.lessThan(left)} and ${media.greaterThan(right)}`;
  },
  greaterThan(size: Size) {
    return `(min-width: ${sizes[size]})`;
  },
};
