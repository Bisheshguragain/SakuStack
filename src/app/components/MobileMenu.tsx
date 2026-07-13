"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useState } from "react";

import styles from "../page.module.css";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tool Directory" },
  { href: "/#reviews", label: "Categories" },
  { href: "/knowledge-centre", label: "Knowledge Centre" },
  { href: "/deals", label: "Deals" },
  { href: "/methodology", label: "Methodology" },
  { href: "/affiliate-disclosure", label: "Disclosure" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mobileMenu}>
      <button
        aria-controls="mobile-site-menu"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className={styles.mobileMenuButton}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span
          className={open ? styles.mobileMenuIconOpen : styles.mobileMenuIcon}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>
        <span>Menu</span>
      </button>

      {open ? (
        <nav className={styles.mobileMenuPanel} id="mobile-site-menu" aria-label="Mobile navigation">
          <div className={styles.mobileMenuGrid}>
            {menuLinks.map((link) => (
              <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
          <a className={styles.mobileContactLink} href="mailto:hello@sakustack.com">
            <Mail size={16} aria-hidden="true" />
            hello@sakustack.com
          </a>
        </nav>
      ) : null}
    </div>
  );
}
