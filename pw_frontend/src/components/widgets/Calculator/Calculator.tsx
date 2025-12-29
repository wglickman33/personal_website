import { useState, useEffect, useRef } from 'react';
import useTheme from '../../../hooks/useTheme';
import './Calculator.scss';

interface CalculatorProps {
  isPreview?: boolean;
}

const Calculator = ({ isPreview = false }: CalculatorProps) => {
  const { theme } = useTheme();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef(display);
  const waitingForNewValueRef = useRef(waitingForNewValue);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    waitingForNewValueRef.current = waitingForNewValue;
  }, [waitingForNewValue]);

  const inputNumber = (num: string) => {
    setDisplay((currentDisplay) => {
      if (currentDisplay === 'Error') {
        clear();
        return num;
      }
      
      if (waitingForNewValueRef.current) {
        setWaitingForNewValue(false);
        return num;
      } else {
        return currentDisplay === '0' ? num : currentDisplay + num;
      }
    });
  };

  const inputDecimal = () => {
    setDisplay((currentDisplay) => {
      if (currentDisplay === 'Error') {
        clear();
        return '0.';
      }
      
      if (waitingForNewValueRef.current) {
        setWaitingForNewValue(false);
        return '0.';
      } else if (currentDisplay.indexOf('.') === -1) {
        return currentDisplay + '.';
      }
      return currentDisplay;
    });
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleOperatorClick = (op: string) => {
    if (display === 'Error') {
      clear();
      return;
    }
    performOperation(op);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      if (isNaN(newValue) || !isFinite(newValue)) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
        return;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        if (secondValue === 0) {
          return NaN;
        }
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      if (isNaN(newValue) || !isFinite(newValue)) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
        return;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const toggleSign = () => {
    if (display === 'Error') {
      clear();
      return;
    }
    
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  const percentage = () => {
    if (display === 'Error') {
      clear();
      return;
    }
    
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const formatDisplay = (value: string): string => {
    if (value === 'Error') {
      return value;
    }
    
    if (value.length > 9) {
      const num = parseFloat(value);
      if (isNaN(num) || !isFinite(num)) {
        return 'Error';
      }
      if (num > 999999999 || num < -999999999) {
        return num.toExponential(3);
      }
      return num.toPrecision(9).replace(/\.?0+$/, '');
    }
    return value;
  };

  useEffect(() => {
    if (isPreview) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        inputNumber(key);
      } else if (key === '.') {
        e.preventDefault();
        inputDecimal();
      } else if (key === '+' || (key === '=' && e.shiftKey)) {
        e.preventDefault();
        handleOperatorClick('+');
      } else if (key === '-') {
        e.preventDefault();
        handleOperatorClick('−');
      } else if (key === '*' || key === '×') {
        e.preventDefault();
        handleOperatorClick('×');
      } else if (key === '/') {
        e.preventDefault();
        handleOperatorClick('÷');
      } else if (key === '=' || key === 'Enter') {
        e.preventDefault();
        handleEquals();
      } else if (key === 'Escape' || key === 'Delete' || key === 'Backspace') {
        e.preventDefault();
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPreview]);

  return (
    <div 
      ref={calculatorRef}
      className={`calculator calculator--${theme} ${isPreview ? 'calculator--preview' : ''}`}
      tabIndex={isPreview ? -1 : 0}
    >
      <div className="calculator__display">
        <span className="calculator__display-text">{formatDisplay(display)}</span>
      </div>
      <div className="calculator__buttons">
        <button className="calculator__button calculator__button--function" onClick={clear}>
          AC
        </button>
        <button className="calculator__button calculator__button--function" onClick={toggleSign}>
          +/−
        </button>
        <button className="calculator__button calculator__button--function" onClick={percentage}>
          %
        </button>
        <button
          className="calculator__button calculator__button--operator"
          onClick={() => handleOperatorClick('÷')}
        >
          ÷
        </button>

        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('7')}>
          7
        </button>
        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('8')}>
          8
        </button>
        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('9')}>
          9
        </button>
        <button
          className="calculator__button calculator__button--operator"
          onClick={() => handleOperatorClick('×')}
        >
          ×
        </button>

        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('4')}>
          4
        </button>
        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('5')}>
          5
        </button>
        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('6')}>
          6
        </button>
        <button
          className="calculator__button calculator__button--operator"
          onClick={() => handleOperatorClick('−')}
        >
          −
        </button>

        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('1')}>
          1
        </button>
        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('2')}>
          2
        </button>
        <button className="calculator__button calculator__button--number" onClick={() => inputNumber('3')}>
          3
        </button>
        <button
          className="calculator__button calculator__button--operator"
          onClick={() => handleOperatorClick('+')}
        >
          +
        </button>

        <button className="calculator__button calculator__button--function calculator__button--history">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </button>
        <button
          className="calculator__button calculator__button--number calculator__button--zero"
          onClick={() => inputNumber('0')}
        >
          0
        </button>
        <button className="calculator__button calculator__button--number" onClick={inputDecimal}>
          .
        </button>
        <button className="calculator__button calculator__button--operator calculator__button--equals" onClick={handleEquals}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;

