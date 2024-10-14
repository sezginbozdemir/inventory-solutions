import React, { useState } from "react";
import { Input, Button, Modal, Text } from "@mantine/core";
import { useAppDispatch } from "../../store/store";
import { addCustomer } from "../../store/features/CustomerSlice";
import { Customer } from "../../api/useCustomerApi";
import { notifications } from "@mantine/notifications";

interface AddCustomerModalProps {
  opened: boolean;
  onClose: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  opened,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const [newCustomer, setNewCustomer] = useState<Customer>({
    name: "",
    company: "",
    adress: "",
    phone: "",
    _id: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    company: false,
    adress: false,
    phone: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: !e.target.value,
    });
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !newCustomer.name,
      company: !newCustomer.company,
      adress: !newCustomer.adress,
      phone: !newCustomer.phone,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    await dispatch(addCustomer(newCustomer));
    notifications.show({
      title: "Customer created",
      message: "Customer has been added successfully!",
      color: "green",
      autoClose: 3000, // Close after 3 seconds
    });

    onClose();
    setNewCustomer({
      name: "",
      company: "",
      adress: "",
      phone: "",
      _id: "",
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} centered title="Add New Customer">
      <Input.Wrapper
        label="Customer Name"
        error={errors.name && <Text size="xs">Customer name is required</Text>}
      >
        <Input
          placeholder="Customer name"
          name="name"
          value={newCustomer.name}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label="Company"
        error={errors.company && <Text size="xs">Entry price is required</Text>}
      >
        <Input
          placeholder="Company"
          name="company"
          value={newCustomer.company}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label="Adress"
        error={errors.adress && <Text size="xs">Adress is required</Text>}
      >
        <Input
          placeholder="Adress"
          name="adress"
          value={newCustomer.adress}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label="Phone number"
        error={errors.phone && <Text size="xs">Phone number is required</Text>}
      >
        <Input
          placeholder="Phone number"
          type="number"
          name="phone"
          value={newCustomer.phone}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Button fullWidth mt="md" onClick={handleSubmit}>
        Save Customer
      </Button>
    </Modal>
  );
};

export default AddCustomerModal;
