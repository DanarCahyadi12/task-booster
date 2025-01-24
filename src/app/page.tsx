'use client';
import {  Container,  VStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Elements } from "@/components/elements/elements";

import { Header } from "@/components/ui/header";
import { Title } from "@/components/elements/title";

export default function Home() {
  const elementRef = useRef<HTMLDivElement[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  return (
    <>
      <Header/>
      <Container width={{sm: 'full', lg: '6/12', md: '7/12'}} margin={'auto'} marginTop={10}>
      <Title elementRef={elementRef} titleRef={titleRef}/>
        <VStack 

         marginTop={{base: 5, lg: 5}}
         width={{lg: 'full', md: 'full', base: '90nvw'}}
         gapY={{base: 2, lg: 4}}
         align={'start'} 
          >
          <Elements elementRef={elementRef} titleRef={titleRef}  />
        </VStack>
      </Container>
    </>
  );
}