import React, { useState, useEffect } from "react";
import { Input, Button, Modal, Text } from "@mantine/core";
import { useAppDispatch } from "../../store/store";
import { editCustomer } from "../../store/features/CustomerSlice";
import { Customer } from "../../api/useCustomerApi";
import { notifications } from "@mantine/notifications";

interface EditCustomerModalProps {
  opened: boolean;
  onClose: () => void;
  customer: Customer | null;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  opened,
  onClose,
  customer,
}) => {
  const dispatch = useAppDispatch();

  const [updatedCustomer, setUpdatedCustomer] = useState<Customer>({
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

  useEffect(() => {
    if (customer) {
      setUpdatedCustomer(customer);
    }
  }, [customer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCustomer({
      ...updatedCustomer,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: !e.target.value,
    });
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !updatedCustomer.name,
      company: !updatedCustomer.company,
      adress: !updatedCustomer.adress,
      phone: !updatedCustomer.phone,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    await dispatch(
      editCustomer({ id: updatedCustomer._id, customer: updatedCustomer })
    );
    notifications.show({
      title: "Customer edited",
      message: "Customer has been edited successfully!",
      color: "green",
      autoClose: 3000, // Close after 3 seconds
    });

    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} centered title="Edit Customer">
      <Input.Wrapper
        label="Customer Name"
        error={errors.name && <Text size="xs">Customer name is required</Text>}
      >
        <Input
          placeholder="Customer name"
          name="name"
          value={updatedCustomer.name}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label="Company"
        error={errors.company && <Text size="xs">Company is required</Text>}
      >
        <Input
          placeholder="Company"
          name="company"
          value={updatedCustomer.company}
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
          value={updatedCustomer.adress}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label="Phone number"
        error={errors.phone && <Text size="xs">Phone number is required</Text>}
      >
        <Input
          placeholder="Phone Number"
          type="number"
          name="phone"
          value={updatedCustomer.phone}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Button fullWidth mt="md" onClick={handleSubmit}>
        Update Customer
      </Button>
    </Modal>
  );
};

export default EditCustomerModal;
