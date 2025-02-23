import { Box, Image, Link } from "@chakra-ui/react";

export function NavBar() {
    return (
        <Box height="100%" display="flex" alignItems="center" pl="0px" zIndex={999}>
            <Link href="https://hackillinois.org">
                <Image
                    src="/hackillinois-logo.svg"
                    height={12}
                    _hover={{ filter: "brightness(90%)", transition: "filter 0.2s ease-in-out", cursor: "pointer" }}  
                />
            </Link>
        </Box>
    )
}