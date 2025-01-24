import { Container } from "@chakra-ui/react"


export const Header = () => {
    return (
        <Container
         width={'full'} 
         height={{base: '25vh', sm: '25vh',md: '30vh', lg: '35vh'}}         
         bgPos={'center'}
         bgSize={'cover'}
         bgImage={"url('/banner.jpg')"}
        >
        </Container>
    )
}