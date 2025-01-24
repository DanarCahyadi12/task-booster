import {v4 as uuid} from 'uuid'

export function getFromLocalStorage<T>(key: string): T | Block {
    const item = localStorage.getItem(key);
    const defaultValue: Block = {
        header: {
            title: 'Weekly to-do list✨',
            bannerURL: ''
        },
        elements: [
            {
                data: {
                    id: uuid(),
                    type: 'text',
                    value: '',
                },
                event: {
                 onHover: false,
                },
            }
           
        ]
    }

    if (!item) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }

    return JSON.parse(item) as T;
}


export function setLocalStorageItem<T>(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
}

export const updateTitle = (block: Block, value: string) => {
    const updatedBlock = block
    updatedBlock.header.title = value

    return updatedBlock;


}

export const updateValue = (blockElements: Block, value: string, index: number): Block => {
    let updatedElements: Block = blockElements;
    updatedElements.elements[index].data.value = value;

    setLocalStorageItem('block-elements', updatedElements);
    return updatedElements;
}

export const changeElement = (blockElements: Block, type: string, index: number) => {
    switch (type) {
        case 'text':
            return changeToText(blockElements, type, index)
        case 'big-heading':
            return changeToText(blockElements, type, index)
        case 'medium-heading':
            return changeToText(blockElements, type, index)
        case 'small-heading':
            return changeToText(blockElements, type, index)
        case 'to-do':
            console.log('changingn into to-do')
            return changeIntoToDo(blockElements, 'to-do', index);
        default:
            console.error('Unknown type')
            break;
    }
}

export const changeToText = (blockElements: Block, newType: string, index: number) => {
    const updatedElements = blockElements.elements.map<ContentElement>((element: ContentElement, elementIndex: number) => {
        if (index === elementIndex) return {
            data: {
                ...element.data,
                type: newType,
            },
            event: {
                ...element.event,
                focused: true
            }
        }
        return element;
    })

    const updatedBlock: Block = {
        ...blockElements,
        elements: updatedElements,
    }
    return updatedBlock;

}

const changeIntoToDo = (blockElements: Block, newType: string, index: number) => {
    const updatedElements = blockElements.elements.map<ContentElement>((element: ContentElement, elementIndex: number) => {
        if (index === elementIndex) return {
            ...element,
            data: {
                ...element.data,
                isChecked: false,
                type: newType,
            },

        }
        return element;
    })

    const updatedBlock: Block = {
        ...blockElements,
        elements: updatedElements
    }


    return updatedBlock;

}

export const deleteElement = (blockElements: Block, index: number): Block  => {
    const updatedElements = [...blockElements.elements];
    updatedElements.splice(index, 1); 

    const updatedBlock: Block = {
        ...blockElements,
        elements: updatedElements,
    };
    

    return updatedBlock

}

export const addText = (blockElements: Block, type: string, index: number): Block => {
    let updatedElements = blockElements;
    updatedElements.elements.splice(index + 1, 0, {
        data: {
            id: uuid(),
            type: type,
            value: ''
        },
        event: {
            onHover: false,
        }
    })

    return updatedElements;


}


export const addToDo = (blockElements: Block, type: string, index: number) => {
    let updatedElements = blockElements;
    updatedElements.elements.splice(index + 1, 0, {
        data: {
            id: uuid(),
            type: type,
            isChecked: false,
            value: ''

        },
        event: {
            onHover: false,
        }
    })

    
    return updatedElements;
}





export const setShowOption = (blockElements: Block, index: number) => {
    const updatedElements: Block = blockElements;
    updatedElements.elements[index].event.onHover = true;
    return updatedElements;
}

export const setDisableOption = (blockElements: Block, index: number) => {
    const updatedElements: Block = blockElements;
    updatedElements.elements[index].event.onHover = false;
    return updatedElements;
}



export const handleFocus = (ref: React.RefObject<HTMLDivElement[]>, index: number) => {
    let element = ref.current[index]
    if (element) {
        const parent = element.children[1] as HTMLElement
        if (parent) {
            const editedElement = parent.querySelector('.edit') as HTMLElement
            if (editedElement) {
                const selection = window.getSelection()
                const range = document.createRange()

                if(selection && range) {
                    range.selectNodeContents(editedElement);
                    range.collapse(false); 
                    selection.removeAllRanges();
                    selection.addRange(range);
                    editedElement.focus(); 
                }
                
            }   
        }
    }
}

