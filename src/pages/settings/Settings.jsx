import { useDispatch, useSelector } from "react-redux";
import {
  setBreakLength,
  setPomodoroLength,
} from "../../features/settingsSlice";

import "./Settings.css";
import { Flex, Heading, Select } from "@chakra-ui/react";
import { toast } from "react-toastify";

export default function Settings() {
  const pomodoroLengths = [1, 15, 25, 30, 45, 60];
  const breakLengths = [2, 5, 7, 10, 15];

  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  console.log("pomo value", settings.pomodoroLength);
  const SettingDropDown = ({ settingName, value, action, optionArr }) => {
    return (
      <Flex direction="column" gap="1.25rem">
        <Heading as="h3" fontSize="1.25rem" color="gray.600">
          {settingName}
        </Heading>
        <Select
          width="40%"
          value={value}
          onChange={(e) => {
            dispatch(action(e.target.value));
            toast.success(
              `${settingName} is changed to ${e.target.value} ${
                value === 1 ? "min" : "mins"
              }`,
              { className: "toast" }
            );
          }}
          backgroundColor="white"
          borderColor="gray.300"
        >
          {optionArr.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Flex>
    );
  };

  return (
    <Flex direction="column" gap="2rem" padding="2rem">
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
    </Flex>
  );
}
