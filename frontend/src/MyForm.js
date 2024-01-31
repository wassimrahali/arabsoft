import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import "./App.css";

export default function MyForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "http://localhost:8000";

  const sendEmail = async () => {
    let dataSend = {
      email: email,
      subject: subject,
      message: message,
    };

    const res = await fetch(`${baseUrl}/email/sendEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // HANDLING ERRORS
    console.log(res);
    if (res.status > 199 && res.status < 300) {
      alert("Send Successfully !");
    }
  };

  return (
    <div className="flex-container">
      <div className="form-container">
        <div className="heading">Contact Us</div>
        <div>
          <FormControl className="form-control" id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Receiver's Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="input-group"
            />
          </FormControl>
          <FormControl className="form-control" id="email">
            <FormLabel>Subject</FormLabel>
            <Input
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              placeholder="Enter the subject here..."
              className="input-group"
            />
          </FormControl>
          <FormControl className="form-control" id="text">
            <FormLabel>Message</FormLabel>
            <Textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here..."
              className="textarea-group"
            />
          </FormControl>
          <Stack spacing={10}>
            <Button
              className="button"
              onClick={() => sendEmail()}
            >
              Send Email
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
