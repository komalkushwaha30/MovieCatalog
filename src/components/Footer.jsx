import { useColor } from "../context/colorContext";

export default function Footer() {
  const { darkMode } = useColor();
  return (
    <footer className={`footer ${darkMode ? "dark" : "light"}`}>
      <div>
        &copy; {new Date().getFullYear()} NavFlix &mdash; All rights reserved.
      </div>
      <div>
        Made with <span style={{color: "red"}}>♥</span> by Komal
      </div>
    </footer>
  );
}