import Link from 'next/link'

type Props = {
  href: string
  locale?: string | false
  className?: string
  'aria-label'?: string
  onClick?: () => void
  children?: React.ReactNode
}

export const NextLink = ({ href, locale, children, ...rest }: Props) => {
  return (
    <Link href={href} locale={locale}>
      <a {...rest}>{children}</a>
    </Link>
  )
}
