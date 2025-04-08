
import React from "react";
import { Link, Github, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/noel-regis-aa07081b1/",
      icon: <Link className="h-5 w-5" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/noelregis18",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      url: "https://x.com/NoelRegis8",
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      name: "Email",
      url: "mailto:noel.regis04@gmail.com",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      name: "Phone",
      url: "tel:+917319546900",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      name: "Topmate",
      url: "http://topmate.io/noel_regis",
      icon: <Link className="h-5 w-5" />,
    },
    {
      name: "Location",
      url: "https://www.google.com/maps/place/Asansol,+West+Bengal,+India",
      icon: <MapPin className="h-5 w-5" />,
    },
  ];

  return (
    <footer className="w-full border-t border-border py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded-full hover:bg-accent transition-colors"
                aria-label={link.name}
              >
                {link.icon}
                <span className="ml-2 text-sm">{link.name}</span>
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Developed by Noel Regis
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
