import { Box, Flex, Text, Spacer, Stack, HStack, Button, useMediaQuery, Image } from "@chakra-ui/react";
import '@fontsource/roboto-slab'
import '@fontsource/nunito'

export function Home() {
    const [isMobile] = useMediaQuery("(max-width: 850px)");
    const [isSmall] = useMediaQuery("(max-width: 500px)");
    
    return (
        <Box>
            <Flex minHeight="88vh" pb="18vh" pt={isMobile ? "4vh" : "10vh"} flexDirection={"column"} alignItems={"center"} textAlign="center" textColor={"#fba036"} backgroundImage={"/main-background.svg"} backgroundSize={isMobile ? "contain" : "cover"} backgroundRepeat={"no-repeat"}>
                <Box p='4' width={isMobile ? "75%" : "100%"} marginBottom={"15vh"}>
                    <HStack justifyContent="center" spacing="8px" textAlign={"center"}>
                        <Image src="/hackillinois-main.svg" />
                    </HStack>
                </Box>
                <Spacer />
                    {/* {isMobile ? (
                        <Stack direction='column' justifyContent="center" spacing='30px' textAlign={"center"}>
                            <Stack direction='row' justifyContent="center" spacing={isSmall? '70px' : '100px'}>
                                <Box>
                                    <Text fontSize={isSmall ? "18" : "23"} fontFamily={"Nunito"} fontWeight={"400"}> 2500+ </Text>
                                    <Text fontSize={isSmall ? "18" : "23"} fontFamily={"Nunito"} fontWeight={"400"}> attendees </Text>
                                </Box>
                                <Box mr='8px'>
                                    <Text fontSize={isSmall ? "18" : "23"} fontFamily={"Nunito"} fontWeight={"400"}> 20+ </Text>
                                    <Text fontSize={isSmall ? "18" : "23"} fontFamily={"Nunito"} fontWeight={"400"}> events </Text>
                                </Box>
                            </Stack>
                            
                            <Box transform={isMobile ? '': 'translate(-10px, -8px)'}>
                                <Text fontSize={isSmall ? "22" : "30"} fontFamily={"Nunito"} fontWeight={"700"} letterSpacing={"0.09em"} textColor={"#68C8BF"}> SEPTEMBER </Text>
                                <Text fontSize={isSmall ? "22" : "30"} fontFamily={"Nunito"} fontWeight={"700"} textColor={"#68C8BF"}> 18-22 </Text>
                            </Box>
                            
                        </Stack>  
                    ) : (
                        <Stack direction='row' justifyContent="center" spacing='150px' textAlign={"center"}>
                             <Box>
                                <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}> 2500+ </Text>
                                <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}> attendees </Text>
                            </Box>
                            
                            <Box transform={isMobile ? '': 'translate(-10px, -8px)'}>
                                <Text fontSize="40" fontFamily={"Nunito"} fontWeight={"700"} letterSpacing={"0.09em"} textColor={"#68C8BF"}> SEPTEMBER </Text>
                                <Text fontSize="40" fontFamily={"Nunito"} fontWeight={"700"} textColor={"#68C8BF"}> 18-22 </Text>
                            </Box>
                            
                            <Box>
                                <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}> 20+ </Text>
                                <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}> events </Text>
                            </Box>
                        </Stack>
                    )} */}
                <Spacer />
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="center" spacing={isMobile ? '30px' : "220px"} alignItems='center' mt='10px' >
                    <Button w={isMobile ? "300px" : "450px"} h={isMobile ? "75px" : "125px"} zIndex={"1"} borderRadius={"2rem"} _hover={{ bg: "#68C8BF" }} as="a" href="/sponsors.pdf"><Text fontSize={isSmall ? "22" : "30"}>Sponsorship Packet</Text></Button>
                    {/* <Button w={isMobile ? "300px" : "450px"} h={isMobile ? "75px" : "125px"} zIndex={"1"} borderRadius={"2rem"} _hover={{ bg: "#68C8BF" }} as="a" href="/login"><Text fontSize={isSmall ? "22" : "30"}>Resume Book</Text></Button> */}
                </Stack>
            </Flex>
        </Box>
    );
}