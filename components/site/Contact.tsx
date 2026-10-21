import ContactForm from './ContactForm';

const EMAIL = 'me.sanjeevks@gmail.com';

// The wire's last hop: the route arrives on the ink field and terminates at the send button.
export default function Contact() {
  return (
    <section id="contact" className="contact" data-spy aria-labelledby="contact-title">
      <span className="contact__wire" aria-hidden="true" />
      <div className="fw contact__head">
        <h2 id="contact-title" className="contact__title grad-text" data-split="lines">Let&apos;s build something great.</h2>
        <p className="contact__lede" data-reveal="fade">
          Have a project in mind, a role to fill, or just want to say hi? My inbox is always open, and I reply
          as soon as I can.
        </p>
      </div>

      <div className="fw contact__body">
        <dl className="contact__details" data-reveal="up">
          <div><dt>Email</dt><dd><a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
          <div><dt>Phone</dt><dd><a className="link" href="tel:+917987914125">+91 79879 14125</a></dd></div>
          <div><dt>Location</dt><dd>Bhopal, India</dd></div>
          <div>
            <dt>Elsewhere</dt>
            <dd className="contact__social">
              <a href="https://github.com/sanjeevnode" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/sanjeevnode" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </dd>
          </div>
        </dl>
        <ContactForm />
      </div>
    </section>
  );
}
