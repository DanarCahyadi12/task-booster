'use client';
import {  Box, Container,  VStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Elements } from "@/components/elements/elements";

import { Header } from "@/components/ui/header";
import { Title } from "@/components/elements/title";

export default function Home() {
  const elementRef = useRef<HTMLDivElement[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  return (
    <Box height={'100vh'}>
      <Header/>
      <Container
       width={{sm: 'full', lg: '6/12', md: '7/12'}} 
       margin={'auto'} marginTop={10}
       >
      <Title elementRef={elementRef} titleRef={titleRef}/>
        <VStack 
         paddingBottom={30} 
         marginBottom={{lg: 10, base: 8}}
         marginTop={{base: 5, lg: 5}}
         width={{lg: 'full', md: 'full', base: '90vw'}}
         gapY={{base: 3, lg: 4}}
         align={'start'} 
          >
          <Elements elementRef={elementRef} titleRef={titleRef}  />
        </VStack>
      </Container>
    </Box>
  );
}