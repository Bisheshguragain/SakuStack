"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

import {
  toolInitials,
  toolLogoHue,
  toolLogoSrc,
  type Software,
} from "../software-data";
import styles from "../page.module.css";

type ToolLogoProps = {
  tool: Pick<Software, "name">;
  className?: string;
};

type LogoStyle = CSSProperties & { "--logo-hue": number };

export default function ToolLogo({ tool, className }: ToolLogoProps) {
  const [failed, setFailed] = useState(false);
  const src = toolLogoSrc(tool);
  const showImage = src && !failed;
  const classes = [styles.toolLogo, className].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      style={{ "--logo-hue": toolLogoHue(tool) } as LogoStyle}
      aria-label={`${tool.name} logo`}
      title={`${tool.name} logo`}
    >
      {showImage ? (
        // Favicons are tiny external vendor assets; plain img avoids routing 120+ third-party logos through Next image config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : null}
      <span className={styles.toolLogoInitials} aria-hidden={showImage ? "true" : "false"}>
        {toolInitials(tool)}
      </span>
    </span>
  );
}
