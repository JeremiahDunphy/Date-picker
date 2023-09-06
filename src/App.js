import "./styles.css";
import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  const sliderHandler = (event) => {
    setStep(event.target.value);
  };

  const nextStepHandler = () => {
    setStep((step) => step + 1);
  };

  const previousStepHandler = () => {
    setStep((step) => step - 1);
  };

  const previousCountHandler = () => {
    setCount((prevCount) => prevCount - 1);
    if (step > 1) {
      setCount((prevCount) => prevCount - step);
    } else if (step < 1) {
      setCount((prevCount) => prevCount - Math.abs(step));
    }
  };

  const nextCountHandler = () => {
    setCount((nextCount) => nextCount + 1);
    if (step > 1) {
      setCount((nextCount) => nextCount + step);
    }
  };

  return (
    <>
      <div className="inner-Container">
        <button className="btn" onClick={previousStepHandler}>
          -
        </button>
        <span>
          <input
            type="range"
            min="0"
            max="10"
            value={step}
            onChange={sliderHandler}
          />
          {step}
        </span>

        <button className="btn" onClick={nextStepHandler}>
          +
        </button>
      </div>
      <div className="outer-Container">
        <button className="btn" onClick={previousCountHandler}>
          -
        </button>
        <span>
          <input
            type="text"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          {count}
        </span>
        <button className="btn" onClick={nextCountHandler}>
          +
        </button>
      </div>
      {count === 0 && <p>{`Today is ${new Date().toDateString()}`}</p>}

      <p>
        {count > 0
          ? `${count} days from today is ${new Date(
              new Date().setDate(new Date().getDate() + count)
            ).toDateString()}`
          : `${Math.abs(count)} days ago was ${new Date(
              new Date().setDate(new Date().getDate() - Math.abs(count))
            ).toDateString()}
            `}
      </p>
      <ResetButton
        count={count}
        setCount={setCount}
        step={step}
        setStep={setStep}
      />
    </>
  );
}

const ResetButton = ({ setCount, setStep }) => {
  return (
    <div className="reset__button-container">
      <button
        className="reset__button"
        onClick={() => {
          setCount(0);
          setStep(0);
        }}
      >
        Reset
      </button>
    </div>
  );
};
