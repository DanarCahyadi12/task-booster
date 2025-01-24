import { Text as TextChakra } from "@chakra-ui/react"
import { useBlockElementStore } from "@/store/useBlockElementStore"
import React, { FormEvent, useEffect, useRef } from "react"
import { setLocalStorageItem } from "@/utils/utils"
import { useDebouncedCallback } from "use-debounce"

export const Text = ({ index }: {
  index: number
}) => {
  const { block, updateBlock } = useBlockElementStore()
  const textRef = useRef<HTMLParagraphElement>(null)
  const debouncedUpdateBlock = useDebouncedCallback(
    (block: Block) => {
      setLocalStorageItem<Block>('block-elements', block)
    },
    300
  )


  const handleUpdateValue = (newValue: string) => {
    const updatedBlock = block
    updatedBlock.elements[index].data.value = newValue
    updateBlock(updatedBlock);
    debouncedUpdateBlock(updatedBlock)

  }

  const handleOnChangeValue = (e: FormEvent<HTMLHeadingElement>) => {
    let value = (e.target as HTMLHeadingElement).textContent || ''
    handleUpdateValue(value);
  }



  useEffect(() => {
    if (textRef.current) textRef.current.textContent = block.elements[index].data.value
  })
  return (
    <TextChakra
      
      color={block.elements[index].data.value === '' ? 'gray' : 'inherit'}
      _empty={{
        _before: {
          content: '"Type here..."',
          color: 'gray',
          opacity: 0.5
        }
      }}
      ref={(e: HTMLParagraphElement) => {
        textRef.current = e
      }}
      fontSize={{base: 13, lg: 'inherit'}}
      className="edit"
      tabIndex={0}
      outline={'none'}
      width={'full'}
      onInput={handleOnChangeValue}
      contentEditable
      suppressContentEditableWarning={true}
    />

  )
}