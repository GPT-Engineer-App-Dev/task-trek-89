import React, { useState } from "react";
import {
  Container,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Checkbox,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Cannot add empty todo",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleToggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%" spacing={2}>
          <Input
            placeholder="Add a new todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <IconButton
            aria-label="Add Todo"
            icon={<FaPlus />}
            onClick={handleAddTodo}
          />
        </HStack>
        <VStack w="100%" spacing={3} align="stretch">
          {todos.length === 0 ? (
            <Text>No todos yet. Add some!</Text>
          ) : (
            todos.map((todo, index) => (
              <HStack key={index} spacing={2}>
                <Checkbox
                  isChecked={todo.completed}
                  onChange={() => handleToggleTodo(index)}
                />
                <Text
                  as={todo.completed ? "s" : undefined}
                  flex="1"
                  wordBreak="break-word"
                >
                  {todo.text}
                </Text>
                <IconButton
                  aria-label="Delete Todo"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTodo(index)}
                />
              </HStack>
            ))
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;