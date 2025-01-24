import { useBlockElementStore } from "@/store/useBlockElementStore";
import { setLocalStorageItem } from "@/utils/utils";
import { Heading } from "@chakra-ui/react";
import { FormEvent, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";


export const Title = ({ elementRef, titleRef }: { elementRef: React.RefObject<HTMLDivElement[]>, titleRef: React.RefObject<HTMLHeadingElement | null> }) => {
    const { block, updateBlock } = useBlockElementStore()
    const handleTitleArrowDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
        const { key } = e
        if (key === 'ArrowDown') {
            const parent = elementRef.current[0].children[1] as HTMLElement
            (parent.querySelector('.edit') as HTMLElement).focus()
        }
    }

    useEffect(() => {
        if (titleRef.current) titleRef.current.textContent = block.header.title;
    });


    const debouncedUpdateBlock = useDebouncedCallback(
        (block: Block) => {
            setLocalStorageItem<Block>('block-elements', block)
        },
        300
    )





    const handleChangeTitle = (e: FormEvent<HTMLHeadingElement>) => {
        const value = (e.target as HTMLHeadingElement).textContent
        const updatedBlock = block
        updatedBlock.header.title = value || ''
        updateBlock(block);
        debouncedUpdateBlock(updatedBlock)


    }
    return (
        <> 
            <Heading
                color={block.header.title === '' ? 'gray': 'inherit'}
                _empty={{
                    _before: {
                        content: '"Page title"',
                        color: 'gray',
                        opacity: 0.5
                    }
                }}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e: React.FormEvent<HTMLHeadingElement>) => handleChangeTitle(e)}
                onKeyDown={handleTitleArrowDown}
                outline={'none'}
                ref={(element: HTMLHeadingElement) => {
                    if (element) {
                        titleRef.current = element
                    }
                }}
                fontSize={{lg: '4xl', base: '2xl'}}
                marginLeft={{lg: 12, base: 9}} 
                />

            

        </>
    )
}