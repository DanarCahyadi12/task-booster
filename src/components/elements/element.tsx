import { BigHeading } from "./big-heading"
import { MediumHeading } from "./medium-heading"
import { SmallHeading } from "./small-heading"
import { Text } from "./text"
import { ToDo } from "./todo"

export const Element = ({element, index}: {
    element: ContentElement,
    index: number
}) => {

        return (
            <>
                {element.data.type === 'text' && <Text index={index}/>}
                {element.data.type === 'big-heading' && <BigHeading index={index}/>}
                {element.data.type === 'medium-heading' && <MediumHeading index={index}/>}
                {element.data.type === 'small-heading' && <SmallHeading index={index}/>}
                {element.data.type === 'to-do' && <ToDo index={index}/>}
            </>
        )
}