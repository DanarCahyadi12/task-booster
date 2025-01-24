import { useBlockElementStore } from "@/store/useBlockElementStore"
import { changeElement, handleFocus } from "@/utils/utils"
import { MenuRoot, MenuTrigger, MenuContent, MenuItem, Container, Text, Box, HStack, Image, MenuItemGroup, MenuSeparator, SelectOpenChangeDetails, MenuSelectionDetails, Float } from "@chakra-ui/react"
import React from "react"

import { PiDotsNineLight } from "react-icons/pi"

export const MenuComponent = ({elementRef, items, index }: { elementRef: React.RefObject<HTMLDivElement[]>, items: MenuItems[], index: number }) => {
  const { block, updateBlock } = useBlockElementStore()
  const handleSelectedItems = (e: MenuSelectionDetails) => {
    const result = changeElement(block, e.value, index)
    if (result) updateBlock(result);
    setTimeout(() => {
      handleFocus(elementRef, index)
    },0)
  }



  return (
    <MenuRoot
      size={{base: 'md', sm: 'sm'}}
      onSelect={(e: MenuSelectionDetails) => handleSelectedItems(e)}>
      <MenuTrigger asChild>
        <PiDotsNineLight cursor={'pointer'} />
      </MenuTrigger>
      <Float placement={'middle-start'} marginLeft={{base: 100, lg: 50}} zIndex={'modal'}>
        <MenuContent padding={1} minW={'13vw'} marginTop={'100%'}>
          <MenuItemGroup padding={2}>
            <Text fontSize={12} fontWeight={'bold'}>Turn into element.</Text>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup>
            {items.map((item: MenuItems, index: number) => {
              return (
                <MenuItem value={item.value} padding={2}
                  key={index}>
                  <Box display={'flex'} flexDirection={'column'}>
                    <HStack>
                      <Image width={'45px'} src={item.imagePath} />
                      <Container>
                        <Text fontWeight={'bold'} fontSize={15} >
                          {item.textValue}
                        </Text>
                        <Text color={'grey'} fontSize={11} >
                          {item.description}
                        </Text>
                      </Container>
                    </HStack>
                  </Box>
                </MenuItem>
              )
            })}
          </MenuItemGroup>
        </MenuContent>
      </Float>
    </MenuRoot>
  )
}
