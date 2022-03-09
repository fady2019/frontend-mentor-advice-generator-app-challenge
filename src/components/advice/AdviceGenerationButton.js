import styles from './AdviceGenerationButton.module.css';

import diceIcon from '../../assets/icon-dice.svg';

const AdviceGenerationButton = props => {
  return (
    <button
      className={`${props.className} ${styles['advice-generation-btn']}`}
      onClick={props.onGenerateAdvice}
    >
      <img src={diceIcon} alt="dice icon" />
    </button>
  );
};

export default AdviceGenerationButton;
