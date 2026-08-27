import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const travelExplorer = Component.Explorer({
  title: "תוכן האתר",
  filterFn: (node) => {
    const hiddenTopLevel = ["Templates", "assets", "90-Reference"]
    return node.slugSegment !== "tags" && !hiddenTopLevel.includes(node.slugSegment)
  },
  mapFn: (node) => {
    const folderNames: Record<string, string> = {
      "00-Index": "נושאים",
      "01-Vienna": "וינה",
      "02-Day-Trips": "טיולי יום",
      "70-People": "אנשים",
      "80-Routes": "מסלולים",
      "90-Reference": "מידע מעשי",
    }
    const folderName = folderNames[node.slugSegment]
    if (node.isFolder && folderName) node.displayName = folderName
  },
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
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
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
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
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
