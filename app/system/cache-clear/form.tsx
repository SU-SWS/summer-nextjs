"use client"

import {useState} from "react"
import {clearCache} from "./actions"
import CheckboxButton from "@components/elements/inputs/checkbox-button"
import cn from "@lib/utils/className"

const CacheClearForm = () => {
  const [message, setMessage] = useState<{success: boolean; message: string} | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setMessage(null)

    try {
      setMessage(await clearCache(formData))
    } catch {
      setMessage({success: false, message: "An error occurred while clearing the cache"})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form action={handleSubmit}>
        <fieldset className="[&>:not([hidden])~:not([hidden])]:mt-50 [&>:not([hidden])~:not([hidden])]:mb-0">
          <legend className="sr-only">Cache Clearing Options</legend>
          <CheckboxButton
            helpText="This will revalidate the menu system and cause every page to rebuild."
            inputProps={{name: "clearMenu"}}
          >
            Clear Main Menu
          </CheckboxButton>
          <CheckboxButton
            helpText="This will revalidate the site wide footer and cause every page to rebuild."
            inputProps={{name: "clearGlobalElements"}}
          >
            Clear Global Footer
          </CheckboxButton>
        </fieldset>

        <div className="mb-50">
          <label className="mb-7.5 flex flex-col gap-12.5">
            <span className="block font-semibold">Specific Path</span>
            <input type="text" name="path" placeholder="/example-path" size={20} className="max-w-300 text-4xl" />
          </label>
          <p className="text-lg italic">Enter a path to revalidate (e.g., /about).</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn border-2 border-cardinal-red bg-digital-red px-20 py-10 font-normal text-white no-underline transition disabled:bg-gray-600 hocus:bg-cardinal-red hocus:text-white hocus:underline"
        >
          {isLoading ? "Clearing Cache..." : "Clear Cache"}
        </button>
      </form>

      {message && (
        <div
          className={cn("mt-10 rounded-md p-10 font-semibold text-white", {
            "bg-green-800": message.success,
            "bg-red-800": !message.success,
          })}
        >
          {message.message}
        </div>
      )}
    </div>
  )
}
export default CacheClearForm
