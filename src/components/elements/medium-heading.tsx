import {  Text as TextChakra } from "@chakra-ui/react"
import { useBlockElementStore } from "@/store/useBlockElementStore"
import React, { FormEvent, useEffect, useRef } from "react"
import { setLocalStorageItem } from "@/utils/utils"
import { useDebouncedCallback } from "use-debounce"

export const MediumHeading = ({index}: {
    index: number
  }) => {
    const {block, updateBlock} = useBlockElementStore()
    const textRef = useRef<HTMLParagraphElement>(null)
    const debouncedUpdateBlock = useDebouncedCallback(
        (block: Block) => {
          setLocalStorageItem<Block>('block-elements', block)
        },
        300
      )
    
    
    const handleUpdateValue = (newValue: string ) => {
      const updatedBlock = block
      updatedBlock.elements[index].data.value = newValue 
      updateBlock(updatedBlock);
      debouncedUpdateBlock(updatedBlock)

    }

    const handleOnChangeValue =(e: FormEvent<HTMLHeadingElement>) => {
        let value = (e.target as HTMLHeadingElement).textContent || ''
        handleUpdateValue(value);
    }


  
    useEffect(() => {
        if(textRef.current) textRef.current.textContent = block.elements[index].data.value
    })
    return (
        <TextChakra 
        ref={(e: HTMLParagraphElement) => {
            textRef.current = e
        }}
        color={block.elements[index].data.value === '' ? 'gray' : 'inherit'}
        _empty={{
          _before: {
            content: '"Type here..."',
            color: 'gray',
            opacity: 0.5
          }
        }}
        className="edit"
        fontWeight={'bold'}
        fontSize={{base: 16, lg:19}}
        tabIndex={0}
        width={'auto'}
        outline={'none'}
        onInput={(e: React.FormEvent<HTMLParagraphElement>) => handleOnChangeValue(e)}
        contentEditable
        suppressContentEditableWarning={true}
        />
     
    )
}