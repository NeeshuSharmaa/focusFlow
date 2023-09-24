import {
  faCaretDown,
  faCaretUp,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {
  Box,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { clearFilters, dropDownHead, dropDownMain } from "./Styles";

export default function Filters({
  filters,
  filterActions: { search, priority, removeFilters, sort, status },
}) {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [caretDown, setCaretDown] = useState({
    status: true,
    priority: true,
    sort: true,
  });

  const otherRadios = [
    { name: "Priority (High → Low)", value: "phl" },
    { name: "Priority (Low → High)", value: "plh" },
    { name: "Time Spent (High → Low)", value: "thl" },
    { name: "Time Spent (Low → High)", value: "tlh" },
  ];
  const checkbox = [
    { name: "High", value: "high" },
    { name: "Medium", value: "medium" },
    { name: "Low", value: "low" },
    { name: "None", value: "none" },
  ];
  const statusRadios = [
    { name: "Completed", value: "completed" },
    { name: "Pending", value: "pending" },
    { name: "All Tasks", value: "all" },
  ];

  return (
    <Flex align="center" gap="1.25rem">
      <InputGroup width="40%" value={filters.search}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          border="none"
          bgColor="white"
          value={filters.search}
          type="text"
          placeholder="Search"
          onChange={(e) => dispatch(search({ search: e.target.value }))}
        />
      </InputGroup>
      {pathname === "/insights" && (
        <Box position="relative">
          <Flex
            sx={dropDownHead}
            onClick={() =>
              setCaretDown((prev) => ({ ...prev, status: !prev.status }))
            }
          >
            <Text>Status</Text>
            <FontAwesomeIcon icon={caretDown ? faCaretDown : faCaretUp} />
          </Flex>
          {!caretDown.status && (
            <>
              <div
                className="outside-click"
                onClick={() =>
                  setCaretDown(() => ({
                    status: true,
                    sort: true,
                    priority: true,
                  }))
                }
              ></div>
              <Flex sx={dropDownMain}>
                <RadioGroup
                  value={filters.status}
                  onChange={(value) => dispatch(status({ status: value }))}
                >
                  <Stack spacing={1}>
                    {statusRadios.map(({ name, value }) => (
                      <Radio key={value} name="status" value={value}>
                        {name}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Flex>
            </>
          )}
        </Box>
      )}
      <Box position="relative">
        <Flex
          sx={dropDownHead}
          onClick={() =>
            setCaretDown((prev) => ({
              status: true,
              sort: true,
              priority: !prev.priority,
            }))
          }
        >
          <Text>Priority</Text>
          <FontAwesomeIcon
            icon={caretDown ? faCaretDown : faCaretUp} //not working? why
          />
        </Flex>
        {!caretDown.priority && (
          <>
            <div
              className="outside-click"
              onClick={() =>
                setCaretDown((prev) => ({
                  status: true,
                  sort: true,
                  priority: true,
                }))
              }
            ></div>

            <Flex sx={dropDownMain}>
              {checkbox.map(({ name, value }) => (
                <Checkbox
                  key={value}
                  value={value}
                  colorScheme="cyan"
                  onChange={(e) =>
                    dispatch(priority({ value, isChecked: e.target.checked }))
                  }
                >
                  {name}
                </Checkbox>
              ))}
            </Flex>
          </>
        )}
      </Box>
      <Box position="relative">
        <Flex
          sx={dropDownHead}
          onClick={() =>
            setCaretDown((prev) => ({
              status: true,
              priority: true,
              sort: !prev.sort,
            }))
          }
        >
          <Text>Sort</Text>
          <FontAwesomeIcon icon={faSort} />
        </Flex>

        {!caretDown.sort && (
          <>
            <div
              className="outside-click"
              onClick={() =>
                setCaretDown(() => ({
                  status: true,
                  sort: true,
                  priority: true,
                }))
              }
            ></div>
            <Flex sx={dropDownMain}>
              <RadioGroup
                value={filters.sort}
                onChange={(value) => dispatch(sort({ sort: value }))}
              >
                <Stack spacing={1}>
                  {otherRadios.map(({ name, value }) => (
                    <Radio
                      key={value}
                      value={value}
                      name="sort"
                      colorScheme="cyan"
                    >
                      {name}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Flex>
          </>
        )}
      </Box>
      {pathname === "/insights" && <Spacer />}
      <Text sx={clearFilters} onClick={() => dispatch(removeFilters())}>
        Clear All
      </Text>
    </Flex>
  );
}
