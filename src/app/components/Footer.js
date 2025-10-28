import { Mail, Linkedin, Github } from "lucide-react";
import styles from '../css/Footer.css'

export const Footer = () => {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:anshkakkar05@gmail.com",
      className: "email",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ansh-kakkar",
      className: "linkedin",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/anshk8",
      className: "github",
    },
  ];

  return (
    <div className="contact-section">
      <div className="contact-container">
        <span className="contact-label">Connect:</span>
        {contacts.map((contact, index) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contact.label}
            className={`contact-button ${contact.className}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <contact.icon className="contact-icon" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;