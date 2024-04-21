import { Text } from '@code-sync/ui';

interface DescriptionProps {
  description: string;
}

export const Description = ({ description }: Readonly<DescriptionProps>) => {
  return <Text>{description}</Text>;
};
