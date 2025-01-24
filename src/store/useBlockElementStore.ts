import { getFromLocalStorage } from "@/utils/utils";
import { create } from "zustand";
import {v4 as uuid} from 'uuid'
interface BlockElementState {
    block: Block;
    updateBlock: (newElement: Block) => void;
}
const defaultValue: Block = {
  header: {
      title: '',
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
export const useBlockElementStore = create<BlockElementState>()((set) => ({
    block: defaultValue ,
    updateBlock: (newBlock) => {
        set(() => (
        {
          block: newBlock
        }
     ))
   },
}))

