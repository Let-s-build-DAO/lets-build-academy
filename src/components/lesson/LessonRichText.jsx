"use client";

import React from "react";

/**
 * Renders lesson copy that may be plain text or HTML from course data.
 */
const LessonRichText = ({ html, className = "", as: Tag = "div" }) => {
  if (!html?.trim()) return null;

  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(html);

  if (!hasHtmlTags) {
    return <Tag className={className}>{html}</Tag>;
  }

  return (
    <Tag
      className={`lesson-prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default LessonRichText;
