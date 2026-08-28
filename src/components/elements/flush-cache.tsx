"use client"

import {revalidatePath, revalidateTag} from "next/cache"
import {usePathname} from "next/navigation"

const FlushCache = () => {
  const currentPath = usePathname()

  const clearCache = async () => {
    "use server"

    revalidatePath(currentPath)
    revalidateTag(`paths:${currentPath}`, "max")
  }

  return (
    <form action={clearCache} className="fixed bottom-0 z-50">
      <button
        type="submit"
        className="rounded-full border border-black-80 bg-white p-4 shadow hocus:bg-black-10 hocus:underline"
      >
        Clear this page cache
      </button>
    </form>
  )
}

export default FlushCache
