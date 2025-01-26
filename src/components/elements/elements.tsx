import { Grid, GridItem } from "@chakra-ui/react"
import { addText, addToDo, changeToText, deleteElement, getFromLocalStorage, handleFocus, setDisableOption, setLocalStorageItem, setShowOption, updateValue } from "@/utils/utils"
import { useBlockElementStore } from "@/store/useBlockElementStore"
import { MenuComponent } from "../menu/menu"
import { useEffect, useState } from "react"
import { Element } from "./element"
import { useDebouncedCallback } from "use-debounce"

export const Elements = ({ elementRef, titleRef }:
  {
    elementRef: React.RefObject<HTMLDivElement[]>,
    titleRef: React.RefObject<HTMLHeadingElement | null>,
  }) => {
  const [menuItems] = useState<MenuItems[]>([
    {
      imagePath: '/TEXT.png',
      textValue: 'Text',
      value: 'text',
      description: 'Simple text.'
    },
    {
      imagePath: '/H1.png',
      textValue: 'Heading 1',
      value: 'big-heading',
      description: 'Big heading.'
    },
    {
      imagePath: '/H2.png',
      textValue: 'Heading 2',
      value: 'medium-heading',
      description: 'Medium heading.'
    },
    {
      imagePath: '/H3.png',
      textValue: 'Heading 3',
      value: 'small-heading',
      description: 'Small heading.'
    },
    {
      imagePath: '/to-do.png',
      textValue: 'To-do List',
      value: 'to-do',
      description: 'Create your tasks.'
    },
  ])

  useEffect(() => {
    const data = getFromLocalStorage<Block>('block-elements')
    updateBlock(data);
  }, [])

  const { block, updateBlock } = useBlockElementStore()
  const debouncedUpdateBlock = useDebouncedCallback(
    (block: Block) => {
      setLocalStorageItem<Block>('block-elements', block)
    },
    300
  )



  const handleKeyBoardEvent = (e: React.KeyboardEvent<HTMLHeadingElement>, index: number) => {
    const { key } = e
    switch (key) {
      case 'Enter':
        e.preventDefault()
        handleAddElement(index);
        break
      case 'ArrowUp':
        handleArrowUp(index);
        break
      case 'ArrowDown':
        handleArrowDown(index);
        break
        case 'Backspace':
          if (block.elements[index].data.value === '' && block.elements.length > 1) {
            e.preventDefault(); // Stop default Backspace behavior
            handleDeleteElement(index);
          }
          break;
        case 'Delete':
          if (block.elements[index].data.value === '' && block.elements.length > 1) {
              e.preventDefault(); // Stop default Backspace behavior
              handleDeleteElement(index);
            }
        break;
      default:
        break;

    }
  }

  const handleAddText = (type: string, index: number) => {
    const updatedBlock = addText(block, type, index)

    if (updatedBlock) {
      updateBlock(updatedBlock)
      debouncedUpdateBlock(updatedBlock)
      setTimeout(() => {
        handleFocus(elementRef, index + 1)
      }, 0)
    }
  }

  const handleAddToDo = (type: string, index: number) => {
    const updatedBlock = addToDo(block, type, index)
    updateBlock(updatedBlock)
    debouncedUpdateBlock(updatedBlock)
    setTimeout(() => {
      handleFocus(elementRef, index + 1)
    }, 0);

  }



  const handleAddElement = (index: number) => {
    const currentElement = block.elements[index]
    const type = currentElement.data.type

    switch (type) {
      case 'text':
        handleAddText(type, index);
        break;
      case 'big-heading':
        handleAddText(type, index);
        break;
      case 'medium-heading':
        handleAddText(type, index);
        break;
      case 'small-heading':
        handleAddText(type, index);
        break;
      case 'to-do':
        handleAddToDo(type, index);
        break;

    }
  }



  const handleArrowUp = (index: number) => {
    if (index <= 0) return titleRef.current?.focus();

    handleFocus(elementRef, index - 1);
  }

  const handleArrowDown = (index: number) => {
    if (index > elementRef.current.length - 1) return;
    handleFocus(elementRef, index + 1);
  }


  const handleShowOption = (index: number) => {
    let updatedElements = block
    updateBlock(setShowOption(updatedElements, index));

  }

  const handleDisableOption = (index: number) => {
    let updatedElements = block
    updateBlock(setDisableOption(updatedElements, index));
  }


  const handleDeleteElement = (index: number) => {
    const element = block.elements[index]
    if (element.data.value !== '' || block.elements.length === 1) return;

    const focusIndex = index === 0 ? index + 1 : index - 1;
    handleFocus(elementRef, focusIndex);
    // Delete the element
    const updatedBlock = deleteElement(block, index);
    if (updatedBlock && updatedBlock !== block) {
      updateBlock(updatedBlock); // Update Zustand store

      // Update elementRef to reflect the new state
      elementRef.current = elementRef.current.filter((_, i) => i !== index);


    }

  }



  return (
    <>

      {block.elements.map((element: ContentElement, index: number) => {
        return (
          <Grid
            ref={(refElement: HTMLDivElement) => {
              if (refElement && !elementRef.current.includes(refElement)) {
                elementRef.current[index] = refElement
              }
            }}
            gapX={{ lg: 2, base: 1 }}
            key={element.data.id}
            width={'inherit'}
            templateColumns={'40px 2fr'}
            onMouseEnter={() => handleShowOption(index)}
            onMouseLeave={() => handleDisableOption(index)}
          >
            <GridItem justifyItems={'end'} position={'relative'}>
              {element.event.onHover &&
                <MenuComponent elementRef={elementRef} items={menuItems} index={index} />}
            </GridItem>
            <GridItem
              overflow={'hidden'}
              lineHeight={1}
              wordBreak={'break-word'}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyBoardEvent(e, index)}
              onClick={() => handleFocus(elementRef, index)}
            >
              <Element element={element}
                index={index} />
            </GridItem>
          </Grid>
        )
      })}
    </>
  )
}