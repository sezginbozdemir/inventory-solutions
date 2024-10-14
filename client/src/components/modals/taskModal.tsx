import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Select,
  Table,
  ActionIcon,
  TextInput,
  Text,
  Group,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { BiTask } from "react-icons/bi";
import { FaPlus, FaRegWindowClose } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { useTaskForm } from "../../hooks/useTaskForm";

interface TaskModalProps {
  opened: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ opened, onClose }) => {
  const {
    employee,
    errors,
    availableEmployees,
    handleEmployeeChange,
    handleSubmit,
    handleAddTask,
    taskList,
    handleTableDelete,
    handleDueDate,
    handleDescription,
    taskDueDate,
    taskDescription,
    toggleDatePicker,
    isDatePickerOpen,
  } = useTaskForm(onClose);

  return (
    <Modal
      fullScreen
      opened={opened}
      onClose={onClose}
      centered
      title="Assign Tasks"
    >
      <Box className="flex flex-col min-h-96 p-5 border-slate-300 border rounded">
        <Box>
          <Select
            className="w-1/3"
            placeholder="Employees.."
            label="Select Employee"
            name="employee"
            value={employee ? employee._id : undefined}
            onChange={handleEmployeeChange}
            error={errors.employees && "Employee is required"}
            data={availableEmployees.map((employee) => ({
              value: employee._id,
              label: `${employee.name}   -   ${employee.email}   -   ${employee.phone}`,
            }))}
            checkIconPosition="right"
            searchable
            nothingFoundMessage="Nothing found..."
          />

          <Group gap="xs" className="flex items-stretch">
            <TextInput
              placeholder="Description"
              value={taskDescription}
              className="w-1/3 self-start"
              label="Task description"
              name="description"
              onChange={handleDescription}
              error={errors.description && "Description is required"}
            />
            <Group gap="xs" className="h-96 w-60 flex-col  mt-6 ml-6">
              <Button
                variant="default"
                className="self-start"
                leftSection={<BsCalendarDate />}
                onClick={toggleDatePicker}
              >
                {taskDueDate
                  ? taskDueDate.toLocaleDateString()
                  : "Select a date"}
              </Button>
              {errors.dueDate && (
                <Text className="self-start" c="red" size="xs">
                  Please select a valid due date.
                </Text>
              )}
              {isDatePickerOpen && (
                <DatePicker
                  className="self-start"
                  value={taskDueDate}
                  onChange={handleDueDate}
                />
              )}
            </Group>

            <Button
              leftSection={<FaPlus />}
              variant="default"
              className="mt-6"
              onClick={handleAddTask}
            >
              Add Task
            </Button>
          </Group>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>Task Description</Table.Th>
                <Table.Th>Due Date</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {taskList.map((item, index) => (
                <Table.Tr key={item.description}>
                  <Table.Td>
                    <BiTask size={20} />
                  </Table.Td>
                  <Table.Td>{item.description}</Table.Td>

                  <Table.Td>
                    {new Date(item.dueDate).toLocaleDateString()}
                  </Table.Td>

                  <Table.Td>
                    <ActionIcon
                      variant="default"
                      onClick={() => handleTableDelete(item)}
                    >
                      <FaRegWindowClose />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
        <Button
          variant="default"
          className="mt-96"
          fullWidth
          onClick={handleSubmit}
        >
          Assing Tasks
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
