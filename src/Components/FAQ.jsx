import { homeFaqs } from "../seo/schema";

function FAQ() {
  const faqs = homeFaqs;

  return (
    <section className="py-5">

      <div className="container">

        <div className="text-center mb-5">

          <span className="badge bg-success px-4 py-2 rounded-pill">
            FAQ
          </span>

          <h2 className="display-5 fw-bold mt-3">
            Frequently Asked Questions
          </h2>

        </div>

        <div
          className="accordion"
          id="faqAccordion"
        >

          {faqs.map((faq, index) => (

            <div
              className="accordion-item"
              key={index}
            >

              <h2
                className="accordion-header"
                id={`heading${index}`}
              >

                <button
                  className={`accordion-button ${
                    index !== 0 ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                >
                  {faq.question}
                </button>

              </h2>

              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
                data-bs-parent="#faqAccordion"
              >

                <div className="accordion-body">
                  {faq.answer}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;