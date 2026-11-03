export default function WhatsAppFloatingButton() {
  // Using same number as your footer contact (you can change anytime)
  const phoneE164 = "923261487487";
  const message = encodeURIComponent("Hi! I want to know more about your tours.");

  const waLink = `https://wa.me/${phoneE164}?text=${message}`;

  return (
    <a
      className="waFloat"
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="WhatsApp"
    >
      {/* WhatsApp icon (SVG) */}
      <svg
        className="waFloat__icon"
        width="26"
        height="26"
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M19.11 17.38c-.27-.14-1.6-.79-1.85-.88-.25-.09-.44-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.46h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.57.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.82-1.28.23-.62.23-1.16.16-1.28-.07-.12-.25-.2-.52-.34z"
        />
        <path
          fill="currentColor"
          d="M16.02 5.33c-5.87 0-10.64 4.77-10.64 10.64 0 1.88.49 3.71 1.42 5.32L5.29 26.7l5.56-1.45c1.55.85 3.3 1.3 5.17 1.3 5.87 0 10.64-4.77 10.64-10.64 0-2.84-1.11-5.51-3.12-7.52-2.01-2.01-4.68-3.12-7.52-3.12zm0 19.4c-1.67 0-3.31-.45-4.74-1.3l-.34-.2-3.3.86.88-3.22-.22-.33c-.93-1.44-1.43-3.11-1.43-4.83 0-4.96 4.03-8.99 8.99-8.99 2.4 0 4.66.93 6.36 2.63 1.7 1.7 2.63 3.96 2.63 6.36 0 4.96-4.03 8.99-8.99 8.99z"
        />
      </svg>
    </a>
  );
}