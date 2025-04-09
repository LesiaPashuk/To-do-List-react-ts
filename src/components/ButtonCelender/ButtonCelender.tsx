import React, {
  ChangeEvent,
  useCallback,
  useState,
  KeyboardEvent,
} from "react";
import Calendar from "react-calendar";
import { ButtonCelenderType, PriorityType, PropsType } from "../Task/Task";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "../ButtonCelender/ButtonCelender.css";
import moment, { Moment } from "moment";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

export const ButtonCelender = React.memo(function ButtonCelender(
  props: ButtonCelenderType
) {
  const [newInputValue, setNewInputValue] = useState("");
  const [error, setError] = useState(false);
  const [priorityDiv, setPriorityDiv] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [valueForm, setValueForm] = useState<PriorityType>("hightPriority");
  const [valueTime, setValueTime]=useState<null|moment.Moment>(null)
  const closeInput=useCallback(()=>{
    props.fuoButtonCelenderActiveStatusInForm(props.buttonCelenderActiveStatus, props.idList)
  },[props.fuoButtonCelenderActiveStatusInForm])
  const addNewInputValueFuo = () => {
    if (newInputValue.trim() != "") {
      props.addTask(
        newInputValue,
        props.buttonStatus,
        props.idList,
        selectedDate,
        valueForm
      );
      setNewInputValue("");
    } else {
      setError(true);
    }
  };
  const takeNewTitleFuo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewInputValue(e.currentTarget.value);
    setError(false);
  }, []);
  const takeNewTitleOnEnterFuo = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        addNewInputValueFuo();
      }
    },
    []
  );
  const onTakeNewTitleFuo = (newValue: string) => {
    props.takeNewTitle(props.idList, newValue);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        addNewInputValueFuo();
      }
    },
    [addNewInputValueFuo]
  );
  return (
    <div className="allFormForInputAndSettings">
      <div className="stringWithSettings">
        <input
          type="text"
          placeholder="Подготовиться к экзамену по..."
          value={newInputValue}
          onChange={takeNewTitleFuo}
          onKeyDown={handleKeyDown}
          className={error ? "error" : "inputForm"}
        ></input>

        {error && (
          <div className="error-massage" onClick={() => setError(!error)}>
            заполнение обязательно
          </div>
        )}
      </div>
      <div className="settingFortaskInput">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            className="datePicker"
            value={selectedDate}
            onChange={(newValue: any) => {
              setSelectedDate(newValue);
            }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
        className="timePicker"
  value={valueTime}
  onChange={(newValue:null|moment.Moment) => setValueTime(newValue)}
/></LocalizationProvider>
        <div className="priorityDiv">
          <div className="divForIconPriority">
          <img
            src="https://img.icons8.com/?size=100&id=WshQLhK5xhRV&format=png&color=a2a2a2"
            alt="priority"
            onClick={() => {
              setPriorityDiv(!priorityDiv);
            }}
          />
          </div>
          {priorityDiv ? (
            <>
              <form className="priority-form">
                <fieldset className="priority-fieldset">
                  <div className="priority-option">
                    <label className="priority-label">Высокий приоритет</label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="25"
                      height="25"
                      viewBox="0,0,256,256"
                      onClick={() => {
                        setValueForm("hightPriority");
                        setTimeout(() => {
                          setPriorityDiv(!priorityDiv);
                        }, 750);
                      }}
                    >
                      <g
                        fill=" #b31414"
                        fillRule="nonzero"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeDasharray=""
                        strokeDashoffset="0"
                        fontFamily="none"
                        fontWeight="none"
                        fontSize="none"
                        textAnchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(8.53333,8.53333)">
                          <path d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="priority-option">
                    <label className="priority-label">Средний приоритет</label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="25"
                      height="25"
                      viewBox="0,0,256,256"
                      onClick={() => {
                        setValueForm("middlePriority");
                        setTimeout(() => {
                          setPriorityDiv(!priorityDiv);
                        }, 750);
                      }}
                    >
                      <g
                        fill="#d2560e"
                        fillRule="nonzero"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeDasharray=""
                        strokeDashoffset="0"
                        fontFamily="none"
                        fontWeight="none"
                        fontSize="none"
                        textAnchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(8.53333,8.53333)">
                          <path d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="priority-option">
                    <label className="priority-label">Низкий приоритет</label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="25"
                      height="25"
                      viewBox="0,0,256,256"
                      onClick={() => {
                        setValueForm("lowPriority");
                        setTimeout(() => {
                          setPriorityDiv(!priorityDiv);
                        }, 750);
                      }}
                    >
                      <g
                        fill="#deb00a"
                        fillRule="nonzero"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeDasharray=""
                        strokeDashoffset="0"
                        fontFamily="none"
                        fontWeight="none"
                        fontSize="none"
                        textAnchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(8.53333,8.53333)">
                          <path d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </fieldset>
              </form>
            </>
          ) : (
            <></>
          )}
        </div>
        
      </div>
      <div className="buttonSaveAndClose">
      <button onClick={addNewInputValueFuo} className="btn btn-primary">
        Save
      </button >
      <button onClick={closeInput} className="btn btn-primary">Close</button>
    </div>
    </div>
  );
});
