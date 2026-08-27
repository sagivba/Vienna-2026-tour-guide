import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <span class="desktop-site-title">{title}</span>
        <span class="mobile-site-title">{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
}

.mobile-site-title {
  display: none;
}

@media all and (max-width: 800px) {
  .page-title {
    font-size: 1.1rem;
    line-height: 1.2;
    white-space: nowrap;
  }

  .desktop-site-title {
    display: none;
  }

  .mobile-site-title {
    display: inline;
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
