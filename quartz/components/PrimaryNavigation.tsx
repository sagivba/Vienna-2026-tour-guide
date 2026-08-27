import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/primaryNavigation.scss"

const navigationItems: Array<{ label: string; slug: FullSlug }> = [
  { label: "בית", slug: "index" as FullSlug },
  { label: "וינה", slug: "00-Index/Vienna" as FullSlug },
  { label: "וינה הקיסרית", slug: "00-Index/Imperial-Vienna" as FullSlug },
  { label: "וינה היהודית", slug: "00-Index/Jewish-Vienna" as FullSlug },
  { label: "טיולי יום", slug: "00-Index/Day-Trips" as FullSlug },
  { label: "מסלולים", slug: "00-Index/Routes" as FullSlug },
  { label: "אנשים", slug: "00-Index/People" as FullSlug },
  { label: "מידע מעשי", slug: "00-Index/Practical-Trip-Index" as FullSlug },
]

const PrimaryNavigation: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  return (
    <nav class="primary-navigation" dir="rtl" aria-label="ניווט ראשי">
      <ul>
        {navigationItems.map(({ label, slug }) => {
          const isCurrentPage = fileData.slug === slug

          return (
            <li>
              <a
                href={resolveRelative(fileData.slug!, slug)}
                class="internal"
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

PrimaryNavigation.css = style

export default (() => PrimaryNavigation) satisfies QuartzComponentConstructor
