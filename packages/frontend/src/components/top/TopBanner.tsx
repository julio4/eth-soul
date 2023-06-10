import Link from 'next/link'
import { FC } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'

export const TopBanner: FC = () => {
  const title = 'Soul'
  const desc = 'ETHPrague Solarpunk Hackathon Project'
  const href = 'https://github.com/julio4/prague'

  return (
    <>
      <Link
        href={href}
        tw="top-0 left-0 right-0 z-10 flex items-center justify-center whitespace-pre-wrap bg-gray-50 border-b border-gray-100 py-2 px-2 text-center font-semibold text-sm text-black/75 hover:text-black"
      >
        <div tw="font-bold">{title}</div>
        <div tw="hidden sm:inline"> – {desc}</div>
        <HiOutlineExternalLink tw="ml-1.5" />
      </Link>
    </>
  )
}
