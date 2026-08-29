import L from "leaflet"

type RouteStop = { label: string; lat: number; lon: number }

document.addEventListener("nav", () => {
  document.querySelectorAll<HTMLElement>(".route-map__canvas[data-stops]").forEach((container) => {
    if (container.dataset.mapInitialized === "true") return
    const status = container.querySelector<HTMLElement>(".route-map__status")
    const showFailure = () => {
      if (!status) return
      status.hidden = false
      status.textContent = "מפת הרקע אינה זמינה כרגע"
    }

    let stops: RouteStop[]
    try {
      stops = JSON.parse(container.dataset.stops ?? "[]")
    } catch {
      showFailure()
      return
    }
    if (stops.length < 2) {
      showFailure()
      return
    }

    container.dataset.mapInitialized = "true"
    let map: L.Map | undefined
    try {
      const leafletMap = L.map(container, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      })
      map = leafletMap
      const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      })
      tiles.on("tileload", () => {
        if (status) status.hidden = true
      })
      tiles.on("tileerror", showFailure)
      tiles.addTo(leafletMap)

      const coordinates = stops.map(({ lat, lon }) => L.latLng(lat, lon))
      L.polyline(coordinates, {
        color: getComputedStyle(document.documentElement).getPropertyValue("--secondary").trim(),
        weight: 4,
        opacity: 0.9,
      }).addTo(leafletMap)

      stops.forEach((stop, index) => {
        const markerLabel = document.createElement("span")
        markerLabel.className = "route-map__marker"
        markerLabel.setAttribute("aria-hidden", "true")
        markerLabel.textContent = String(index + 1)
        const icon = L.divIcon({
          className: "route-map__marker-wrap",
          html: markerLabel,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        })
        L.marker([stop.lat, stop.lon], {
          icon,
          title: `${index + 1}. ${stop.label}`,
          keyboard: true,
        })
          .bindTooltip(`${index + 1}. ${stop.label}`, { direction: "top" })
          .addTo(leafletMap)
      })

      leafletMap.fitBounds(L.latLngBounds(coordinates), { padding: [28, 28], maxZoom: 17 })
      window.addCleanup(() => map?.remove())
    } catch {
      map?.remove()
      container.dataset.mapInitialized = "false"
      showFailure()
    }
  })
})
