import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/routeMap.scss"
import { resolveRelative } from "../util/path"
// @ts-expect-error Quartz's .inline loader imports this client script as a string at build time.
import script from "./scripts/routeMap.inline"

type MapStop = { page: string; label: string; lat: number; lon: number }
type RouteMapData = { stops?: MapStop[]; verified?: string; source?: string }

const googleDirectionsUrl = (stops: MapStop[]) => {
  const params = new URLSearchParams({
    api: "1",
    origin: `${stops[0].lat},${stops[0].lon}`,
    destination: `${stops.at(-1)!.lat},${stops.at(-1)!.lon}`,
    travelmode: "walking",
  })
  if (stops.length > 2) {
    params.set(
      "waypoints",
      stops
        .slice(1, -1)
        .map(({ lat, lon }) => `${lat},${lon}`)
        .join("|"),
    )
  }
  return `https://www.google.com/maps/dir/?${params}`
}

const RouteMap: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const map = fileData.frontmatter?.route_map as RouteMapData | undefined
  const stops = map?.stops?.filter(
    (stop) => stop.page && stop.label && Number.isFinite(stop.lat) && Number.isFinite(stop.lon),
  )
  if (!stops || stops.length < 2) return null

  const pages = new Map(allFiles.map((file) => [file.slug?.split("/").at(-1), file.slug] as const))
  const pageHref = (page: string) => {
    const slug = pages.get(page)
    return slug && fileData.slug ? resolveRelative(fileData.slug, slug) : page
  }
  // Google Maps URLs reliably support only three intermediate waypoints on
  // mobile browsers. Overlap the boundary stop so no place is omitted.
  const segments: MapStop[][] = []
  for (let start = 0; start < stops.length - 1; start += 4) {
    segments.push(stops.slice(start, Math.min(start + 5, stops.length)))
  }

  return (
    <section class="route-map" aria-labelledby="route-map-title">
      <h2 id="route-map-title">מפת המסלול</h2>
      <p class="route-map__intro">
        המספרים מציגים את סדר הביקור על מפת הרחובות. הקו מחבר בין התחנות ואינו תחליף להוראות ההליכה
        של Google Maps.
      </p>
      <div class="route-map__visual">
        <div
          class="route-map__canvas"
          data-stops={JSON.stringify(stops.map(({ label, lat, lon }) => ({ label, lat, lon })))}
          role="region"
          aria-label="מפת OpenStreetMap אינטראקטיבית של תחנות המסלול"
        >
          <p class="route-map__status" role="status">
            המפה האינטראקטיבית נטענת. רשימת התחנות וקישורי הניווט זמינים להלן.
          </p>
        </div>
        <ol class="route-map__legend">
          {stops.map((stop) => (
            <li>
              <a href={pageHref(stop.page)} class="internal">
                {stop.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div class="route-map__actions">
        {segments.map((segment, index) => (
          <a
            class="route-map__button"
            href={googleDirectionsUrl(segment)}
            target="_blank"
            rel="noopener"
          >
            {segments.length === 1
              ? "פתיחת המסלול המלא ב-Google Maps"
              : `פתיחת חלק ${index + 1} ב-Google Maps`}
          </a>
        ))}
      </div>
      {segments.length > 1 && (
        <p class="route-map__note">
          המסלול פוצל כדי שכל התחנות יישמרו גם בטלפון; התחנה האחרונה בחלק הראשון היא תחנת הפתיחה של
          החלק הבא.
        </p>
      )}
      {map?.source && (
        <p class="route-map__source">
          נקודות המפה אומתו ב-{map.verified}: <a href={map.source}>OpenStreetMap</a>.
        </p>
      )}
    </section>
  )
}

RouteMap.css = style
RouteMap.afterDOMLoaded = script
export default (() => RouteMap) satisfies QuartzComponentConstructor
