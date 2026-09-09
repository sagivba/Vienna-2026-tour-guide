export type VisitStatus =
  | "planned"
  | "possible-stop"
  | "candidate"
  | "visited"
  | "partial"
  | "skipped"

export type StatusIconName =
  | "Calendar"
  | "MapPin"
  | "CircleHelp"
  | "CircleCheck"
  | "CircleDot"
  | "CircleX"

export const visitStatusDetails: Record<VisitStatus, { icon: StatusIconName; label: string }> = {
  planned: { icon: "Calendar", label: "מתוכנן" },
  "possible-stop": { icon: "MapPin", label: "עצירה אפשרית" },
  candidate: { icon: "CircleHelp", label: "מועמד" },
  visited: { icon: "CircleCheck", label: "בוצע" },
  partial: { icon: "CircleDot", label: "בוצע חלקית" },
  skipped: { icon: "CircleX", label: "לא בוצע" },
}

export function getVisitStatus(value: unknown) {
  return typeof value === "string" && value in visitStatusDetails
    ? visitStatusDetails[value as VisitStatus]
    : undefined
}

export function getDisplayVisitStatus(frontmatter: Record<string, unknown> | undefined) {
  const displayStatus = frontmatter?.visit_status ?? frontmatter?.status
  const details = getVisitStatus(displayStatus)

  return details ? { status: displayStatus as VisitStatus, ...details } : undefined
}
