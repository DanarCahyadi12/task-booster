import { getFromLocalStorage } from "@/utils/utils";
import { create } from "zustand";

interface BlockElementState {
    block: Block;
    updateBlock: (newElement: Block) => void;
}

const blockElements = getFromLocalStorage<Block>('block-elements')
export const useBlockElementStore = create<BlockElementState>()((set) => ({
    block: blockElements,
    updateBlock: (newBlock) => {
        set(() => (
        {
          block: newBlock
        }
     ))
   },
}))

