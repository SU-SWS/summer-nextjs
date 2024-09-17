import {extendTailwindMerge} from "tailwind-merge"

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Creates an array containing type-# classes from 0 to 1
      "font-size": Array.from({length: 10}, (_, i) => `type-${i}`),
    },
  },
})

export default customTwMerge
