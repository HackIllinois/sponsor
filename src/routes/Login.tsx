import { Box, Button, Flex, HStack, Text, Input, useMediaQuery, useToast, Image, VStack } from "@chakra-ui/react";
import { useState } from 'react';

import TwoFactor from "./TwoFactor";

export function Login() {
  const [isMobile] = useMediaQuery("(max-width: 850px)");
  const [isSmall] = useMediaQuery("(max-width: 600px)");
  const [isXSmall] = useMediaQuery("(max-width: 400px)");
  const [email, setEmail] = useState(""); // State to store the email input
  const [codePage, setCodePage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Login Code Sent!",
      description: "Please check your email for the login code.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  const sponsorLogin = async (email: string) => {
    setLoading(true);
    const url = "https://adonix.hackillinois.org/auth/sponsor/verify";

    try {
      await fetch(`${url}/?email=${encodeURIComponent(email)}`, {method: "POST"});

      setCodePage(true);
      showToast();
    } catch (error) {
      setError("Invalid Email. Please try again.");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    // console.log("Button clicked, email:", email);
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    sponsorLogin(email);
  };

  const handleBack = () => {
    setCodePage(false);
  }

  // Log the input value whenever it's updated
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    // console.log("Input value:", e.target.value);  // Log the input value
  };

  return (
    <Box minHeight={'800px'}>
      <Flex minHeight="88vh" pb="18vh" pt={isMobile ? "4vh" : "10vh"} flexDirection={"column"} alignItems={"center"} textAlign="center" backgroundImage={"/main-background.svg"} backgroundSize={isMobile ? "contain" : "cover"} backgroundRepeat={"no-repeat"}>
        <Box p='4' width={isMobile ? "75%" : "100%"} marginBottom={"15vh"}>
          <VStack spacing="10vh" >
            <HStack justifyContent="center" spacing="8px" textAlign={"center"}>
              <Image src="/hackillinois-main.svg" />
            </HStack>
            <HStack justifyContent="center" spacing="8px" textAlign={"center"}>
              <Text fontSize={isXSmall ? "20" : isSmall ? "28" : "43"} fontFamily={"Nunito"} fontWeight={"500"} letterSpacing={"0.08em"}> Resume Book </Text>
            </HStack>
            {codePage ? (
          <TwoFactor email={email} handleBack={handleBack} />
        ) : (
          <Box zIndex="2">
            <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"400"}>Enter your Email</Text>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="name@example.com"
              width="80vw"
              maxWidth="400px"
              mt="20px"
              // mx="auto"
              // bg="white"
              textColor="black"
              isDisabled={loading}
              // borderRadius="5px"
              _placeholder={{ color: "gray.400" }}
            />
            <Button
              bg="blue.500"
              color="white"
              borderRadius="5px"
              onClick={() => handleSubmit()}
              zIndex="3"
              m={4}
              mb={5}
              disabled={loading}
              _hover={{ bg: "blue.600" }}
            >
              Submit
            </Button>
            {error && (
              <Box
                mt={2}
                p={2}
                bg="red.500"
                color="white"
                borderRadius="md"
                maxWidth="250px"
                mx="auto"
              >
                {error}
              </Box>
            )}
          </Box>
        )}
          </VStack>
          
        </Box>
      </Flex>
    </Box>
  );
}