import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const travelExplorer = Component.Explorer({
  title: "תוכן האתר",
  filterFn: (node) => {
    const hiddenTopLevel = ["Templates", "assets", "90-Reference"]
    return node.slugSegment !== "tags" && !hiddenTopLevel.includes(node.slugSegment)
  },
})

const breadcrumbs = Component.Breadcrumbs({
  rootName: "בית",
  spacerSymbol: "‹",
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.PrimaryNavigation()],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    breadcrumbs,
    Component.ArticleTitle(),
    Component.ContentMeta({ separator: "·" }),
    Component.TagList(),
    Component.RouteMap(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    travelExplorer,
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [breadcrumbs, Component.ArticleTitle(), Component.ContentMeta({ separator: "·" })],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    travelExplorer,
  ],
  right: [],
}
