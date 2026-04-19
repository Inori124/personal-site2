export default function EmailLink() {
  const email = 'caoying124@gmail.com';

  return (
    <div className="contact-email-container">
      <a href={`mailto:${email}`} className="contact-email-link">
        <span className="contact-email-prefix">{email}</span>
      </a>
    </div>
  );
}
