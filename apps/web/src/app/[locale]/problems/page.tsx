import { notFound } from 'next/navigation';
import { LocalizedLink } from '@code-sync/translations';
import { Text } from '@code-sync/ui';
import { getCodingProblems } from '@/services';
import { isDefined } from '@/utils';

const ProblemList = async () => {
  const { codingProblems } = await getCodingProblems();
  if (!codingProblems?.length) return notFound();

  return (
    <ul>
      {codingProblems
        .filter(isDefined)
        .map(({ title, description, difficulty, id }) => (
          <li key={id}>
            <LocalizedLink scroll href={`/problems/${id}`}>
              <Text className="font-bold">{title}</Text>
            </LocalizedLink>
            <Text>{description}</Text>
            <Text>{difficulty}</Text>
          </li>
        ))}
    </ul>
  );
};

export default ProblemList;
