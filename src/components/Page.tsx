import { Grid, GridItem } from "@chakra-ui/react";

interface PageProps {
    pageContent: React.ReactElement,
    showNav: boolean
}

const navTemplateArea = `
"header header"
"nav main"`

const navLessTemplateArea = `
"header"
"main"`

export function Page({pageContent, showNav}: PageProps) {
    return <Grid
        templateAreas={showNav ? navTemplateArea : navLessTemplateArea}
        gridTemplateRows={showNav ? '12vh 1fr': '0vh 1fr'}
        gridTemplateColumns={showNav ? '0px 1fr' : '1fr'}
        h='100%'
        minH={"100vh"}
        // maxH={"100vh"}
        gap='1'
        fontWeight='bold'
        bg={"brand.100"}
        overflow="hidden" height="100%"
    >
        {/* {showNav ? 
            <GridItem pl='2' area={'nav'}>
                Nav
            </GridItem> : 
            <></>} */}
        
        <GridItem pl='2' area={'main'}>
            {pageContent}
        </GridItem>
    </Grid>
}
