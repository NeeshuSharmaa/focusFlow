import { useDispatch, useSelector } from "react-redux";
import {
  setBreakLength,
  setPomodoroLength,
} from "../../features/settingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import "./Settings.css";

export default function Settings() {
  const pomodoroLengths = [1, 15, 25, 30, 40, 45, 50];
  const breakLengths = [5, 7, 10, 15];

  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const SettingDropDown = ({ settingName, value, action, optionArr }) => {
    return (
      <div>
        <h3>{settingName}</h3>
        <select
          value={value}
          onChange={(e) => dispatch(action(e.target.value))}
        >
          <option disabled>Break Length</option>
          {optionArr.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div>
      <SettingDropDown
        settingName={"Pomodoro Length"}
        value={settings.pomodoroLength}
        action={setPomodoroLength}
        optionArr={pomodoroLengths}
      />
      <SettingDropDown
        settingName={"Break Length"}
        value={settings.breakLength}
        action={setBreakLength}
        optionArr={breakLengths}
      />
    </div>
  );
}
