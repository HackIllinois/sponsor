import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Text, HStack, VStack } from '@chakra-ui/react';

interface TwoFactorProps {
  email: string;
  handleBack: () => void;
}

const TwoFactor: React.FC<TwoFactorProps> = ({ email, handleBack }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.trim().toUpperCase());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(code)

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://adonix.hackillinois.org/auth/sponsor/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code
        })
      });

      if (!response.ok) {
        throw new Error();
      }
 
      const { token } = await response.json();
      setSuccess('Two-factor authentication successful!');
      localStorage.setItem('jwt', token);
      navigate('/resume-book');
    } catch (err) {
      setError('Invalid Code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box zIndex="2">
      <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"400"}>
        Enter 6-Digit Code:
      </Text>
      <HStack spacing={2} mt="20px" justify="center">
        <Input
          textAlign="center"
          size="md"
          width="80vw"
          maxWidth="400px"
          bg="white"
          textColor="black"
          borderRadius="5px"
          isDisabled={loading}
          value={code}
          onChange={handleChange}
          _placeholder={{ color: "gray.400" }}
        />
      </HStack>
      <VStack spacing={2} mt="20px" justify="center">
        <HStack>
          <Button bg="gray.500" color="white" borderRadius="5px" m={2} onClick={handleBack} _hover={{ bg: "gray.600" }}>
              Back
            </Button>
          <Button
            bg="green.500"
            color="white"
            borderRadius="5px"
            zIndex="3"
            m={4}
            mb={5}
            _hover={{ bg: "green.600" }}
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </HStack>
      </VStack>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </Box>
  );
};

export default TwoFactor;