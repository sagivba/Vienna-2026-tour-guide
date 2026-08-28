const mobileNavigationQuery = window.matchMedia("(max-width: 800px)")

document.addEventListener("nav", () => {
  const navigation = document.querySelector(".primary-navigation")
  const toggle = navigation?.querySelector<HTMLButtonElement>(".primary-navigation-toggle")
  const explorer = document.querySelector<HTMLElement>(".explorer")
  if (!navigation || !toggle || !explorer) return
  const explorerContent = explorer.querySelector<HTMLElement>(".explorer-content")

  const close = () => {
    toggle.setAttribute("aria-expanded", "false")
    explorer.setAttribute("aria-expanded", "false")
    explorerContent?.setAttribute("aria-expanded", "false")
    explorer.classList.add("collapsed")
  }

  const toggleMenu = () => {
    const open = toggle.getAttribute("aria-expanded") !== "true"
    toggle.setAttribute("aria-expanded", String(open))
    explorer.setAttribute("aria-expanded", String(open))
    explorerContent?.setAttribute("aria-expanded", String(open))
    explorer.classList.toggle("collapsed", !open)
  }

  const closeAfterNavigation = (event: Event) => {
    if (mobileNavigationQuery.matches && (event.target as Element).closest("a")) close()
  }
  const closeOnEscape = (event: Event) => {
    if (mobileNavigationQuery.matches && (event as KeyboardEvent).key === "Escape") {
      close()
      toggle.focus()
    }
  }
  const resetForDesktop = () => {
    if (!mobileNavigationQuery.matches) {
      toggle.setAttribute("aria-expanded", "false")
      explorer.setAttribute("aria-expanded", "true")
      explorerContent?.setAttribute("aria-expanded", "true")
      explorer.classList.remove("collapsed")
    }
  }

  toggle.addEventListener("click", toggleMenu)
  explorer.addEventListener("click", closeAfterNavigation)
  document.addEventListener("keydown", closeOnEscape)
  mobileNavigationQuery.addEventListener("change", resetForDesktop)
  window.addCleanup(() => {
    toggle.removeEventListener("click", toggleMenu)
    explorer.removeEventListener("click", closeAfterNavigation)
    document.removeEventListener("keydown", closeOnEscape)
    mobileNavigationQuery.removeEventListener("change", resetForDesktop)
  })
})
