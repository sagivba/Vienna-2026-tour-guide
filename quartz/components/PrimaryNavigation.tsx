import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/primaryNavigation.scss"

// @ts-ignore
import script from "./scripts/primaryNavigation.inline"

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
      <button
        class="primary-navigation-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="primary-navigation-links"
      >
        <span>תפריט</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <ul id="primary-navigation-links">
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
PrimaryNavigation.afterDOMLoaded = script

export default (() => PrimaryNavigation) satisfies QuartzComponentConstructor
