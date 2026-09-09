import assert from "node:assert"
import test, { describe } from "node:test"
import { getDisplayVisitStatus, getVisitStatus } from "./visitStatusData"

describe("VisitStatus", () => {
  test("contains all supported status labels", () => {
    assert.strictEqual(getVisitStatus("planned")?.label, "מתוכנן")
    assert.strictEqual(getVisitStatus("possible-stop")?.label, "עצירה אפשרית")
    assert.strictEqual(getVisitStatus("candidate")?.label, "מועמד")
    assert.strictEqual(getVisitStatus("visited")?.label, "בוצע")
    assert.strictEqual(getVisitStatus("partial")?.label, "בוצע חלקית")
    assert.strictEqual(getVisitStatus("skipped")?.label, "לא בוצע")
  })

  test("ignores unknown and content-only statuses", () => {
    assert.strictEqual(getVisitStatus("first-complete-build"), undefined)
    assert.strictEqual(getVisitStatus(undefined), undefined)
  })

  test("prefers visit_status over status and never reads content_status", () => {
    assert.strictEqual(
      getDisplayVisitStatus({ visit_status: "planned", status: "visited" })?.status,
      "planned",
    )
    assert.strictEqual(
      getDisplayVisitStatus({ visit_status: "unknown", status: "visited" }),
      undefined,
    )
    assert.strictEqual(getDisplayVisitStatus({ status: "visited" })?.label, "בוצע")
    assert.strictEqual(getDisplayVisitStatus({ content_status: "planned" }), undefined)
  })
})
