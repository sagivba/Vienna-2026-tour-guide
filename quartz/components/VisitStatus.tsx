import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/visitStatus.scss"
import { getDisplayVisitStatus, StatusIconName } from "./visitStatusData"

type StatusIcon = (props: JSX.SVGAttributes<SVGSVGElement>) => JSX.Element

const iconProps: JSX.SVGAttributes<SVGSVGElement> = {
  "aria-hidden": "true",
  fill: "none",
  height: 14,
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": 2,
  viewBox: "0 0 24 24",
  width: 14,
}

const Calendar: StatusIcon = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
)

const MapPin: StatusIcon = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const CircleHelp: StatusIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 1 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
)

const CircleCheck: StatusIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const CircleDot: StatusIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="1" />
  </svg>
)

const CircleX: StatusIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
)

const statusIcons: Record<StatusIconName, StatusIcon> = {
  Calendar,
  MapPin,
  CircleHelp,
  CircleCheck,
  CircleDot,
  CircleX,
}

const VisitStatusBadge: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter
  const details = getDisplayVisitStatus(frontmatter)

  if (!details) return null

  const Icon = statusIcons[details.icon]
  return (
    <div class={classNames(displayClass, "visit-status")} data-status={details.status}>
      <Icon class="visit-status-icon" />
      <span>{details.label}</span>
    </div>
  )
}

VisitStatusBadge.css = style

export default (() => VisitStatusBadge) satisfies QuartzComponentConstructor
