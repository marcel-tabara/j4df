import Image from 'next/image'
import { NextLink } from './NextLink'

type Props = {
  title: string
  src: string
  slug?: string
}

export const Thumbnail = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      width={1280}
      height={720}
    />
  )
  return (
    <>
      {slug ? (
        <NextLink href={`/posts/${slug}`} aria-label={title}>
          {/* {image && image} */}
        </NextLink>
      ) : (
        image
      )}
    </>
  )
}
