export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-6">
      <div className="social-links flex mb-4">{/* Add your social media icons and links here */}</div>
      <div className="copyright text-sm text-gray-600">
        &copy; {new Date().getFullYear()} ~ Built by Jeremiah Quill.
      </div>
    </footer>
  );
}
