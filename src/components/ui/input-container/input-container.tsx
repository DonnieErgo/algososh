import { FC } from 'react';
import styles from './input-container.module.css';

type TInputContainer = {
  children: React.ReactNode;
};

export const InputContainer: FC<TInputContainer> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};