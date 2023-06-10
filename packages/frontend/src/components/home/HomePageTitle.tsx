import { color } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import cover from 'public/images/cover.png'
import { FC } from 'react'

import 'twin.macro'

export const HomePageTitle: FC = () => {
  const title = ''
  const desc = 'Local exchange trading system empowering local communities'
  const githubHref = 'https://github.com/julio4/prague'
  const deployHref = 'https://github.com/julio4/prague#deployment'

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono z-50">
        <Link
          href={githubHref}
          target="_blank"
          className="group"
          tw="flex cursor-pointer flex-col items-center"
        >
          <Image
            priority
            src={cover}
            alt={title}
            width={600}
            css={{
              borderRadius: '1rem',
            }}
          />
          <h1 tw="mt-4 font-black text-3xl tracking-tight underline-offset-4 group-hover:underline">
            {title}
          </h1>
        </Link>
        <p tw="mt-1 text-xl text-gray-700">{desc}</p>
      </div>
    </>
  )
}
