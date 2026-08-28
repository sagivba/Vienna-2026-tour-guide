import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "ללא כותרת",
    description: "לא סופק תיאור",
  },
  components: {
    callout: {
      note: "הערה",
      abstract: "תקציר",
      info: "מידע",
      todo: "לביצוע",
      tip: "טיפ",
      success: "הצלחה",
      question: "שאלה",
      warning: "אזהרה",
      failure: "כישלון",
      danger: "סכנה",
      bug: "תקלה",
      example: "דוגמה",
      quote: "ציטוט",
    },
    backlinks: {
      title: "קישורים לכאן",
      noBacklinksFound: "לא נמצאו קישורים לכאן",
    },
    themeToggle: {
      lightMode: "מצב בהיר",
      darkMode: "מצב כהה",
    },
    explorer: { title: "תוכן האתר" },
    footer: { createdWith: "נוצר באמצעות" },
    graph: { title: "תצוגת גרף" },
    recentNotes: {
      title: "רשומות אחרונות",
      seeRemainingMore: ({ remaining }) => `עוד ${remaining} ←`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `הטמעה מתוך ${targetSlug}`,
      linkToOriginal: "קישור למקור",
    },
    search: {
      title: "חיפוש",
      searchBarPlaceholder: "חיפוש באתר",
    },
    tableOfContents: { title: "תוכן העניינים" },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} דקות קריאה`,
    },
  },
  pages: {
    rss: {
      recentNotes: "רשומות אחרונות",
      lastFewNotes: ({ count }) => `${count} הרשומות האחרונות`,
    },
    error: {
      title: "העמוד לא נמצא",
      notFound: "העמוד פרטי או שאינו קיים.",
      home: "חזרה לעמוד הבית",
    },
    folderContent: {
      folder: "תיקייה",
      itemsUnderFolder: ({ count }) => `${count} פריטים בתיקייה זו.`,
    },
    tagContent: {
      tag: "תגית",
      tagIndex: "מפתח תגיות",
      itemsUnderTag: ({ count }) => `${count} פריטים עם תגית זו.`,
      showingFirst: ({ count }) => `מוצגות ${count} התגיות הראשונות.`,
      totalTags: ({ count }) => `נמצאו ${count} תגיות.`,
    },
  },
} as const satisfies Translation
