"use client";

import { useState } from "react";
import { TextInput, Textarea, Group, Button } from "@mantine/core";
import { Modal, ModalTriggerButton } from "./ui/Modal"; // ✅ import your modal component

export default function ModalFormExample() {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // ✅ do something (send to API, etc.)
    setOpened(false); // close modal on submit
  };

  return (
    <>
      <ModalTriggerButton
        label="Open Form"
        onClick={() => setOpened(true)}
        className="bg-blue-600 hover:bg-blue-700"
      />

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Contact Form"
        className="rounded-lg shadow-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Textarea
            label="Message"
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            minRows={3}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
