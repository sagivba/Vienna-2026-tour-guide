import { Root, Heading } from "mdast"
import { toString } from "mdast-util-to-string"
import { QuartzTransformerPlugin } from "../types"

const normalize = (value: string) => value.trim().replace(/\s+/g, " ")

export const SuppressDuplicateTitle: QuartzTransformerPlugin = () => ({
  name: "SuppressDuplicateTitle",
  markdownPlugins() {
    return [
      () => (tree: Root, file) => {
        // ArticleTitle intentionally does not render on the homepage, so its
        // authored H1 remains the sole visible page title there.
        if (file.data.slug === "index") return

        const firstContentIndex = tree.children.findIndex((node) => node.type !== "yaml")
        const first = tree.children[firstContentIndex] as Heading | undefined
        const frontmatter = file.data.frontmatter
        const pageTitle = normalize(
          String((frontmatter?.name_he as string | undefined) ?? frontmatter?.title ?? ""),
        )

        if (first?.type !== "heading" || first.depth !== 1 || !pageTitle) return

        const heading = normalize(toString(first))
        const suffix = heading.slice(pageTitle.length).trimStart()
        const duplicatesTitle =
          heading === pageTitle || (heading.startsWith(pageTitle) && /^(?:\(|-|–|—|:)/.test(suffix))

        if (duplicatesTitle) tree.children.splice(firstContentIndex, 1)
      },
    ]
  },
})
