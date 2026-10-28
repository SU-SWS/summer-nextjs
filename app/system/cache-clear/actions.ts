"use server"

import {revalidateTag} from "next/cache"
import {headers} from "next/headers"
import {isCacheClearAuthorized} from "@lib/utils/security"

/**
 * Turn the form's path field into page paths: split on whitespace, give each one exactly one leading
 * slash and no trailing slash, so `about`, `/about/` and `//about` all clear `paths:/about`. A lone `/`
 * stays the home page.
 */
const parsePaths = (value: FormDataEntryValue | null): string[] =>
  typeof value === "string"
    ? value
        .split(/\s+/)
        .filter(Boolean)
        .map(path => "/" + path.replace(/^\/+|\/+$/g, ""))
    : []

export async function clearCache(formData: FormData) {
  // Server actions are reachable by POST on their own, so don't rely on proxy.ts alone. The browser
  // resends the Basic Auth credentials it used for the page with the action request.
  if (!(await isCacheClearAuthorized((await headers()).get("authorization"))))
    return {success: false, message: "Not authorized."}

  try {
    const clearMenu = formData.get("clearMenu") === "on"
    const clearGlobalElements = formData.get("clearGlobalElements") === "on"

    const cleared = []

    if (clearMenu) {
      revalidateTag("menu:main", "max")
      cleared.push("main menu")
    }
    if (clearGlobalElements) {
      revalidateTag("config-pages", "max")
      cleared.push("global footer")
    }

    for (const path of parsePaths(formData.get("path"))) {
      revalidateTag(`paths:${path}`, "max")
      cleared.push(path)
    }

    if (cleared.length > 0) {
      return {
        success: true,
        message: "Successfully cleared " + cleared.join(", ") + ".",
      }
    }
    return {
      success: false,
      message: "Please choose an element to clear cache or enter a path.",
    }
  } catch (error) {
    console.error("Cache clear error:", error)
    return {
      success: false,
      message: "Failed to clear cache. Check server logs for details.",
    }
  }
}
