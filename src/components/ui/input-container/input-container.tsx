import { FC, ReactNode } from 'react';
import styles from './input-container.module.css';

type TInputContainer = {
  children: ReactNode;
  extraClass?: string;
};

export const InputContainer: FC<TInputContainer> = ({ children, extraClass = '', }) => {
  return <div className={`${styles.container} ${extraClass}`}>{children}</div>;
};