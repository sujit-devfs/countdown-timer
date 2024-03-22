import { useEffect, useState } from "react";
import "./App.css";
import Title from "./components/Header";
import UserInput from "./components/UserInput";
import Button from "./components/Button";
import TimerBlock from "./components/TimerBlock";
import MessageForUser from "./components/MessageForUser";
import sound from "./sound.mp3";

function App() {
  const audio = new Audio(sound);
  const [inputDate, setInputDate] = useState("");
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const cancelTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    setInputDate("");
    console.log("timer cancelled");
  };

  const startTimer = () => {
    if (!inputDate) {
      setUserMessage("Please select a valid date and time.");
      return;
    }

    setIsTimerActive(true);
    setUserMessage("");
  };

  const handleDateChange = (date) => {
    const selectedDateTime = new Date(date).getTime();
    const currentDateTime = new Date().getTime();

    if (selectedDateTime <= currentDateTime) {
      setUserMessage("Please select a future date and time.😊");
      setIsTimerActive(false);
      return;
    }

    const maxDays = 99;
    const maxFutureDate = new Date();
    maxFutureDate.setDate(maxFutureDate.getDate() + maxDays);
    const maxFutureDateTime = maxFutureDate.getTime();

    if (selectedDateTime > maxFutureDateTime) {
      setUserMessage("Please select a date and time within the next 99 days.☹️");
      setIsTimerActive(false);
      setInputDate("");
      return;
    }

    setInputDate(date);
    setUserMessage("");
  };
  
  useEffect(() => {
    console.log("useEffect triggered. isTimerActive:", isTimerActive);
    if (isTimerActive && inputDate) {
      const intervalId = setInterval(() => {
        const current = new Date().getTime();
        const target = new Date(inputDate).getTime();
        const difference = target - current;

        if (difference <= 0) {
          clearInterval(intervalId);
          setIsTimerActive(false);
          setUserMessage(`Timer Completed🎊
          🎉`);
          audio.play();
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line
  }, [isTimerActive, inputDate]);


  return (
    <>
      <div className="container">
        <Title isTimerActive={isTimerActive}/>
        <UserInput handleDateChange={handleDateChange} />
        <Button
          onClick={isTimerActive ? cancelTimer : startTimer}
          isTimerActive={isTimerActive}
        />
        <div className="timer-container">
          {Object.keys(timeRemaining).map((block) => {
            return (
              <TimerBlock
                key={block}
                value={timeRemaining[block]}
                label={block}
              />
            );
          })}
        </div>
        <MessageForUser message={userMessage} />
      </div>
    </>
  );
}

export default App;
