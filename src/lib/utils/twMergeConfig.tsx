import {extendTailwindMerge} from "tailwind-merge"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../../tailwind.config.js"

const fullConfig = resolveConfig(tailwindConfig)

const customTwMerge = extendTailwindMerge({
  override: {
    classGroups: {
      ...fullConfig.theme.decanter,
    },
  },
})

export default customTwMerge
