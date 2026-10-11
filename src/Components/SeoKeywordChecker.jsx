import { useMemo, useState } from "react";

// =====================================================
// TEXT ANALYSIS HELPERS
// =====================================================

const countWords = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

const countSentences = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  return sentences.length || 1;
};

const countSyllables = (word) => {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!cleaned) return 0;

  const vowelGroups = cleaned.match(/[aeiouy]+/g);
  let count = vowelGroups ? vowelGroups.length : 1;

  if (cleaned.endsWith("e") && count > 1) {
    count -= 1;
  }

  return Math.max(1, count);
};

const countTotalSyllables = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.reduce((total, word) => total + countSyllables(word), 0);
};

const fleschReadingEase = (words, sentences, syllables) => {
  if (words === 0 || sentences === 0) return 0;

  const score =
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);

  return Math.max(0, Math.min(100, Math.round(score)));
};

const getReadabilityLabel = (score) => {
  if (score >= 90) return "Very Easy";
  if (score >= 70) return "Easy";
  if (score >= 60) return "Fairly Easy";
  if (score >= 50) return "Standard";
  if (score >= 30) return "Fairly Difficult";
  return "Difficult";
};

const escapeRegExp = (string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const countKeywordOccurrences = (text, keyword) => {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword) return 0;

  const pattern = new RegExp(escapeRegExp(trimmedKeyword), "gi");
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
};

// =====================================================
// STATUS HELPERS
// =====================================================

const getScoreColor = (score) => {
  if (score >= 85) return "text-success";
  if (score >= 70) return "text-primary";
  if (score >= 50) return "text-warning";
  return "text-danger";
};

const getScoreClass = (score) => {
  if (score >= 85) return "bg-success";
  if (score >= 70) return "bg-primary";
  if (score >= 50) return "bg-warning";
  return "bg-danger";
};

function SeoKeywordChecker() {
  // =====================================================
  // STATE
  // =====================================================

  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [content, setContent] = useState("");

  // =====================================================
  // TITLE ANALYSIS
  // =====================================================

  const titleLength = title.length;

  const titleStatus = useMemo(() => {
    if (titleLength === 0) return { label: "Empty", className: "text-muted" };
    if (titleLength < 30) return { label: "Too Short", className: "text-warning" };
    if (titleLength <= 60) return { label: "Good Length", className: "text-success" };
    return { label: "Too Long", className: "text-danger" };
  }, [titleLength]);

  // =====================================================
  // META DESCRIPTION ANALYSIS
  // =====================================================

  const metaLength = metaDescription.length;

  const metaStatus = useMemo(() => {
    if (metaLength === 0) return { label: "Empty", className: "text-muted" };
    if (metaLength < 120) return { label: "Too Short", className: "text-warning" };
    if (metaLength <= 160) return { label: "Good Length", className: "text-success" };
    return { label: "Too Long", className: "text-danger" };
  }, [metaLength]);

  // =====================================================
  // CONTENT ANALYSIS
  // =====================================================

  const analysis = useMemo(() => {
    const wordCount = countWords(content);
    const sentenceCount = countSentences(content);
    const syllableCount = countTotalSyllables(content);
    const readability = fleschReadingEase(wordCount, sentenceCount, syllableCount);
    const avgWordsPerSentence =
      sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;

    const keywordCount = countKeywordOccurrences(content, focusKeyword);
    const keywordDensity =
      wordCount > 0 && focusKeyword.trim()
        ? (keywordCount / wordCount) * 100
        : 0;

    const first100Words = content.trim().split(/\s+/).slice(0, 100).join(" ");
    const keywordInIntro =
      focusKeyword.trim() &&
      first100Words.toLowerCase().includes(focusKeyword.trim().toLowerCase());

    const keywordInTitle =
      focusKeyword.trim() &&
      title.toLowerCase().includes(focusKeyword.trim().toLowerCase());

    const keywordInMeta =
      focusKeyword.trim() &&
      metaDescription.toLowerCase().includes(focusKeyword.trim().toLowerCase());

    return {
      wordCount,
      sentenceCount,
      readability,
      readabilityLabel: getReadabilityLabel(readability),
      avgWordsPerSentence,
      keywordCount,
      keywordDensity,
      keywordInIntro,
      keywordInTitle,
      keywordInMeta,
    };
  }, [content, focusKeyword, title, metaDescription]);

  // =====================================================
  // CHECKLIST + OVERALL SCORE
  // =====================================================

  const checklist = useMemo(() => {
    const items = [];

    items.push({
      label: "Focus keyword in title",
      passed: Boolean(analysis.keywordInTitle),
      relevant: Boolean(focusKeyword.trim() && title.trim()),
    });

    items.push({
      label: "Focus keyword in meta description",
      passed: Boolean(analysis.keywordInMeta),
      relevant: Boolean(focusKeyword.trim() && metaDescription.trim()),
    });

    items.push({
      label: "Focus keyword appears early in content",
      passed: Boolean(analysis.keywordInIntro),
      relevant: Boolean(focusKeyword.trim() && content.trim()),
    });

    items.push({
      label: "Keyword density between 0.5% and 2.5%",
      passed: analysis.keywordDensity >= 0.5 && analysis.keywordDensity <= 2.5,
      relevant: Boolean(focusKeyword.trim() && content.trim()),
    });

    items.push({
      label: "Content is at least 300 words",
      passed: analysis.wordCount >= 300,
      relevant: Boolean(content.trim()),
    });

    items.push({
      label: "Title length is 30-60 characters",
      passed: titleLength >= 30 && titleLength <= 60,
      relevant: Boolean(title.trim()),
    });

    items.push({
      label: "Meta description is 120-160 characters",
      passed: metaLength >= 120 && metaLength <= 160,
      relevant: Boolean(metaDescription.trim()),
    });

    return items;
  }, [analysis, focusKeyword, title, metaDescription, content, titleLength, metaLength]);

  const relevantChecks = checklist.filter((item) => item.relevant);
  const passedChecks = relevantChecks.filter((item) => item.passed);

  const overallScore =
    relevantChecks.length > 0
      ? Math.round((passedChecks.length / relevantChecks.length) * 100)
      : 0;

  const hasAnyInput = Boolean(
    title.trim() || metaDescription.trim() || content.trim()
  );

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="container py-5">
      {/* HEADER */}
      <div className="text-center mb-5">
        <span className="badge bg-primary px-3 py-2 mb-3">🔍 SEO Tool</span>

        <h2 className="display-5 fw-bold">SEO & Keyword Checker</h2>

        <p className="lead text-muted mx-auto" style={{ maxWidth: 760 }}>
          Check your title, meta description and content for SEO best
          practices, keyword usage and readability — entirely in your
          browser.
        </p>
      </div>

      {/* TITLE & META CARD */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h2 className="h4 fw-bold mb-4">Title & Meta Description</h2>

          <div className="mb-4">
            <label htmlFor="seoTitle" className="form-label fw-semibold">
              Page / Post Title
            </label>
            <input
              id="seoTitle"
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your page title..."
            />
            <div className="d-flex justify-content-between mt-1">
              <small className={titleStatus.className}>{titleStatus.label}</small>
              <small className="text-muted">{titleLength} / 60 characters</small>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="seoMeta" className="form-label fw-semibold">
              Meta Description
            </label>
            <textarea
              id="seoMeta"
              className="form-control"
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Enter your meta description..."
            />
            <div className="d-flex justify-content-between mt-1">
              <small className={metaStatus.className}>{metaStatus.label}</small>
              <small className="text-muted">{metaLength} / 160 characters</small>
            </div>
          </div>

          {/* GOOGLE PREVIEW */}
          {(title.trim() || metaDescription.trim()) && (
            <div className="border rounded-3 p-3 bg-light">
              <div className="small text-muted mb-1">Search result preview</div>
              <div style={{ fontFamily: "arial, sans-serif" }}>
                <div style={{ color: "#1a0dab", fontSize: 20, lineHeight: 1.3 }}>
                  {title.trim() || "Your Page Title"}
                </div>
                <div style={{ color: "#006621", fontSize: 14 }}>
                  yourdomain.com
                </div>
                <div style={{ color: "#545454", fontSize: 14, marginTop: 2 }}>
                  {metaDescription.trim() ||
                    "Your meta description will appear here..."}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* KEYWORD + CONTENT CARD */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h2 className="h4 fw-bold mb-4">Content & Keyword Analysis</h2>

          <div className="mb-4">
            <label htmlFor="focusKeyword" className="form-label fw-semibold">
              Focus Keyword
            </label>
            <input
              id="focusKeyword"
              type="text"
              className="form-control"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="Example: compress image online"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="seoContent" className="form-label fw-semibold">
              Content
            </label>
            <textarea
              id="seoContent"
              className="form-control"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your article or blog content here..."
            />
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {hasAnyInput && (
        <>
          {/* STATS */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1">📝</div>
                  <h3 className="fw-bold">{analysis.wordCount}</h3>
                  <p className="text-muted mb-0">Words</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1">🎯</div>
                  <h3 className="fw-bold">
                    {analysis.keywordDensity.toFixed(1)}%
                  </h3>
                  <p className="text-muted mb-0">
                    Keyword Density ({analysis.keywordCount}x)
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1">📖</div>
                  <h3 className={`fw-bold ${getScoreColor(analysis.readability)}`}>
                    {analysis.readability}
                  </h3>
                  <p className="text-muted mb-0">
                    Readability ({analysis.readabilityLabel})
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1">❤️</div>
                  <h3 className={`fw-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}/100
                  </h3>
                  <p className="text-muted mb-0">SEO Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* OVERALL SCORE BAR */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-semibold">Overall SEO Score</span>
                <strong className={getScoreColor(overallScore)}>
                  {overallScore}/100
                </strong>
              </div>
              <div className="progress" style={{ height: 12 }}>
                <div
                  className={`progress-bar ${getScoreClass(overallScore)}`}
                  style={{ width: `${overallScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* CHECKLIST */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h3 className="h5 fw-bold mb-3">📋 SEO Checklist</h3>

              {checklist
                .filter((item) => item.relevant)
                .map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center py-2 border-bottom"
                  >
                    <span>{item.label}</span>
                    <strong className={item.passed ? "text-success" : "text-danger"}>
                      {item.passed ? "✓ Pass" : "⚠ Needs Work"}
                    </strong>
                  </div>
                ))}

              {relevantChecks.length === 0 && (
                <p className="text-muted mb-0">
                  Add a focus keyword, title, meta description or content to
                  see checklist results.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* PRIVACY */}
      <div className="text-center mt-5">
        <small className="text-muted">
          🔒 Everything is analyzed directly in your browser. Nothing you
          type here is sent to a server.
        </small>
      </div>
    </section>
  );
}

export default SeoKeywordChecker;