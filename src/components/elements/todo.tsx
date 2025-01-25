import { HStack, Text } from "@chakra-ui/react";
import { Checkbox } from '../ui/checkbox';
import { useBlockElementStore } from "@/store/useBlockElementStore";
import { setLocalStorageItem } from "@/utils/utils";
import React, { FormEvent, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export const ToDo = ({ index }: { index: number }) => {
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

    const handleChecked = (e: FormEvent<HTMLLabelElement>) => {
        const checked = (e.target as HTMLInputElement).checked
        
        const updatedBlock = block
        const element = block.elements[index] as ToDo
        element.data.isChecked = checked

        updatedBlock.elements[index] = element
        updateBlock(updatedBlock)
        setLocalStorageItem('block-elements', updatedBlock)

    }
    useEffect(() => {
        if (textRef.current) textRef.current.textContent = block.elements[index].data.value
    })
    return (
        <HStack alignItems={'start'}>
            <Checkbox
                onChange={(e: FormEvent<HTMLLabelElement>) => handleChecked(e)}
                checked={(block.elements[index] as ToDo).data.isChecked}
                variant={'subtle'}
            />
            <Text
                textDecoration={(block.elements[index] as ToDo).data.isChecked ? 'line-through': 'none'}
                color={block.elements[index].data.value === '' ? 'gray' : 'inherit'}
                className="edit"
                tabIndex={0}
                outline={'none'}
                width={'full'}
                _empty={{
                    _before: {
                        content: '"Type here..."',
                        color: 'gray',
                        opacity: 0.5
                    }
                }}
                fontSize={{base: 14, lg: 'inherit'}}
                onInput={handleOnChangeValue}
                ref={(e: HTMLParagraphElement) => { if (e) textRef.current = e }}
                contentEditable
                suppressContentEditableWarning={true}
            />
        </HStack>
    );
}