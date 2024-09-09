"use client"

import {
  Table as ResponsiveTable,
  Thead as ResponsiveThead,
  Tbody as ResponsiveTbody,
  Tr as ResponsiveTr,
  Th as ResponsiveTh,
  Td as ResponsiveTd,
} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {twMerge} from "tailwind-merge"
import {OmitProps as ResponsiveTableProps, TdProps} from "react-super-responsive-table/dist/esm/types"
import {HTMLAttributes} from "react"

export const Table = ({children, className, ...props}: ResponsiveTableProps) => {
  if (className?.includes("sum-table")) {
    className = twMerge(
      className,
      "centered 2xl:max-w-1200 relative left-1/2 w-screen -translate-x-1/2 break-words font-roboto [&_th]:font-light [&_th>a]:type-1 md:[&_th>a]:type-2 [&_th>a]:font-light [&_th>a>svg]:w-16 [&_th]:type-1 [&_th]:rs-px-2 [&_th]:rs-py-1  [&_td]:type-0 [&_td]:big-paragraph [&_tbody>tr>th]:bg-transparent [&_tfooter>tr]:bg-transparent [&_tr]:border-t-0 [&_td]:border-r-3 [&_td]:border-r-white [&_td]:rs-px-2 [&_td]:rs-py-1 [&_tbody>tr:nth-child(odd)>td:nth-child(1)]:bg-[#F8F7F6] [&_tfooter>tr:nth-child(odd)]:bg-[#F8F7F6] [&_tbody>tr:nth-child(odd)>td:nth-child(2)]:bg-[#F4795B] [&_tbody>tr:nth-child(odd)>td:nth-child(3)]:bg-[#F9A44A] [&_tbody>tr:nth-child(even)>td:nth-child(2)]:bg-[#F6947C] [&_tbody>tr:nth-child(even)>td:nth-child(3)]:bg-[#FAB66E]"
    )
  }
  if (className?.includes("sum-footer")) {
    className = twMerge(
      className,
      "[&_tbody>tr:nth-last-child(2)>td]:bg-white [&_tbody>tr:nth-last-child(2)>td:nth-child(2)]:bg-white [&_tbody>tr:nth-last-child(2)>td:nth-child(3)]:bg-white [&_tbody>tr:nth-last-child(1)>td]:bg-[#F8F7F6] [&_tbody>tr:nth-last-child(1)>td:nth-child(2)]:bg-[#F8F7F6] [&_tbody>tr:nth-last-child(1)>td:nth-child(3)]:bg-[#F8F7F6]"
    )
  }

  return (
    <ResponsiveTable {...props} className={className}>
      {children}
    </ResponsiveTable>
  )
}

export const Thead = ({children, ...props}: ResponsiveTableProps) => {
  return <ResponsiveThead {...props}>{children}</ResponsiveThead>
}
export const Tbody = ({children, ...props}: ResponsiveTableProps) => {
  return <ResponsiveTbody {...props}>{children}</ResponsiveTbody>
}
export const Tr = ({children, ...props}: ResponsiveTableProps) => {
  return <ResponsiveTr {...props}>{children}</ResponsiveTr>
}
export const Th = ({children, ...props}: ResponsiveTableProps) => {
  return <ResponsiveTh {...props}>{children}</ResponsiveTh>
}
export const Td = ({children, ...props}: Omit<TdProps & HTMLAttributes<HTMLTableCellElement>, "headers">) => {
  return <ResponsiveTd {...props}>{children}</ResponsiveTd>
}
