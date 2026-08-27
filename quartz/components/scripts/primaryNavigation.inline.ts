const mobileNavigationQuery = window.matchMedia("(max-width: 800px)")

document.addEventListener("nav", () => {
  const navigation = document.querySelector(".primary-navigation")
  const toggle = navigation?.querySelector<HTMLButtonElement>(".primary-navigation-toggle")
  if (!navigation || !toggle) return

  const close = () => {
    toggle.setAttribute("aria-expanded", "false")
    navigation.classList.remove("is-open")
  }

  const toggleMenu = () => {
    const open = toggle.getAttribute("aria-expanded") !== "true"
    toggle.setAttribute("aria-expanded", String(open))
    navigation.classList.toggle("is-open", open)
  }

  const closeAfterNavigation = (event: Event) => {
    if (mobileNavigationQuery.matches && (event.target as Element).closest("a")) close()
  }
  const closeOnEscape = (event: Event) => {
    if ((event as KeyboardEvent).key === "Escape") {
      close()
      toggle.focus()
    }
  }
  const resetForDesktop = () => {
    if (!mobileNavigationQuery.matches) close()
  }

  toggle.addEventListener("click", toggleMenu)
  navigation.addEventListener("click", closeAfterNavigation)
  navigation.addEventListener("keydown", closeOnEscape)
  mobileNavigationQuery.addEventListener("change", resetForDesktop)
  window.addCleanup(() => {
    toggle.removeEventListener("click", toggleMenu)
    navigation.removeEventListener("click", closeAfterNavigation)
    navigation.removeEventListener("keydown", closeOnEscape)
    mobileNavigationQuery.removeEventListener("change", resetForDesktop)
  })
})
