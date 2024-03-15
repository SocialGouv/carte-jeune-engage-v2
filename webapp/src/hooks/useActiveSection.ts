import { useState, useEffect } from "react";

export default function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Adjust this to change when a section becomes "active"
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight + 150 > scrollPosition
        ) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]); // Only re-run the effect if sectionIds changes

  return activeSection;
}
