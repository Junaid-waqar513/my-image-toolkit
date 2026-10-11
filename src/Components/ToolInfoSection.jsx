import { Link } from "react-router-dom";

// Educational text block shown below a tool. Gives each tool page real,
// descriptive content for visitors, search engines and ad reviewers —
// not just an interactive widget with no surrounding copy.
//
// content = {
//   heading: "…",
//   sections: [{ title, paragraphs: [], list: [], }],
//   links: [{ text, to }]            // optional "related guides"
// }
function ToolInfoSection({ content }) {
  if (!content) return null;

  return (
    <section className="container py-5">
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 className="h3 fw-bold mb-4">{content.heading}</h2>

        {content.sections.map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="h5 fw-bold">{section.title}</h3>

            {(section.paragraphs || []).map((text, i) => (
              <p key={i} className="text-muted">
                {text}
              </p>
            ))}

            {section.list && (
              <ul className="text-muted">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {content.links && content.links.length > 0 && (
          <p className="text-muted mb-0">
            <strong>Related guides:</strong>{" "}
            {content.links.map((link, i) => (
              <span key={link.to}>
                {i > 0 && " · "}
                <Link to={link.to}>{link.text}</Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}

export default ToolInfoSection;
