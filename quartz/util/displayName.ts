import { QuartzPluginData } from "../plugins/vfile"

/** Reader-facing labels for folders that do not have their own index note. */
export const folderDisplayNames: Record<string, string> = {
  "00-Index": "נושאים",
  "01-Vienna": "וינה",
  "02-Day-Trips": "טיולי יום",
  "70-People": "אנשים",
  "80-Routes": "מסלולים",
  "90-Reference": "מידע מעשי",
  "01-Innere-Stadt": "הרובע הראשון (Innere Stadt)",
  "02-Leopoldstadt": "הרובע השני (Leopoldstadt)",
  "03-Landstrasse": "הרובע השלישי (Landstraße)",
  "04-Wieden": "הרובע הרביעי (Wieden)",
  "13-Hietzing": "הרובע השלושה־עשר (Hietzing)",
  "Cross-District": "נושאים חוצי רבעים",
  "Salzburg-and-Lakes": "זלצבורג והאגמים",
  "Vienna-Alps": "האלפים הווינאיים",
  Wachau: "ואכאו",
}

type Frontmatter = QuartzPluginData["frontmatter"]

export function readerFacingName(frontmatter: Frontmatter, slugSegment: string): string {
  const nameHe = frontmatter?.name_he
  if (typeof nameHe === "string" && nameHe.trim() !== "") return nameHe

  const title = frontmatter?.title
  if (typeof title === "string" && title.trim() !== "" && title !== "index") return title

  return folderDisplayNames[slugSegment] ?? slugSegment.replace(/^\d+-/, "").replaceAll("-", " ")
}
