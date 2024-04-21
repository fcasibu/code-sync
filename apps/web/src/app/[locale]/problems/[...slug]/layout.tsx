import styles from './layout.module.css';

interface ProblemLayoutProps {
  explorer: React.ReactNode;
  code: React.ReactNode;
}

const ProblemLayout = ({ explorer, code }: Readonly<ProblemLayoutProps>) => {
  return (
    <section className={styles.problemLayout}>
      {explorer}
      {code}
    </section>
  );
};

export default ProblemLayout;
