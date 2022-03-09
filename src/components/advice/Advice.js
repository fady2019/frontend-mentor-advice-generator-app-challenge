import { Fragment, useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';

import styles from './Advice.module.css';

import Card from '../UI/Card';

import AdviceGenerationButton from './AdviceGenerationButton';

const Advice = () => {
  const [advice, setAdvice] = useState(null);

  const [sendRequest, response, isLoading, error] = useHttp();

  const generateAdviceHandler = useCallback(() => {
    sendRequest('https://api.adviceslip.com/advice');
  }, [sendRequest]);

  useEffect(() => {
    generateAdviceHandler();
  }, [generateAdviceHandler]);

  useEffect(() => {
    if (response) {
      setAdvice(response.slip);
    }
  }, [response]);

  let adviceContainer;

  if (error) {
    adviceContainer = <p className={styles.msg}>{error}</p>;
  } else if (isLoading || !response || !advice) {
    adviceContainer = <p className={styles.msg}>Generating...</p>;
  } else {
    adviceContainer = (
      <Fragment>
        <span className={styles['advice-id']}>ADVICE #{advice.id}</span>
        <q className={styles.advice}>{advice.advice}</q>

        <span className={styles['pattern-divider']}></span>

        <AdviceGenerationButton
          className={styles['advice-generation-btn']}
          onGenerateAdvice={generateAdviceHandler}
        />
      </Fragment>
    );
  }

  return <Card className={styles['advice-card']}>{adviceContainer}</Card>;
};

export default Advice;
