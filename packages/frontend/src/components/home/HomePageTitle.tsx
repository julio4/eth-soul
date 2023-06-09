import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC } from 'react'
import 'twin.macro'

export const HomePageTitle: FC = () => {
  const title = 'LETS SEL IT'
  const desc = 'Local exchange trading system for the public good'
  const githubHref = 'https://github.com/julio4/prague'
  const deployHref = 'https://github.com/julio4/prague#deployment'

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono">
        <Link
          href={githubHref}
          target="_blank"
          className="group"
          tw="flex cursor-pointer flex-col items-center"
        >
          <h1 tw="mt-4 font-black text-3xl tracking-tight underline-offset-4 group-hover:underline">
            {title}
          </h1>
        </Link>
        <p tw="mt-1 text-gray-700">{desc}</p>
      </div>
    </>
  )
}
