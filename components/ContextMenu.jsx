export function ContextMenu({ x, y, options, children }) {
  const handleMenuOptionClick = (option) => {
    console.log("Option clicked:", option);
  };

  return (
    <div
      onClick={() => handleMenuOptionClick}
      onContextMenu={(e) => {
        e.preventDefault(); // prevent the default behaviour when right clicked
        console.log("Right Click");
        openCustomMenu(e, options, handleMenuOptionClick);
      }}>
      {children}
    </div>
  );
}
