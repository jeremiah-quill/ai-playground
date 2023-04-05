export const Pill = ({
  text,
  onClick = () => {},
  onRemove = null,
  className,
  id = "",
  disabled = false,
  isHighlighted = false,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  const highlightColor = isHighlighted ? "bg-yellow-500" : "bg-slate-500";

  return (
    <div className="flex gap-2 items-center mb-2">
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          onMouseLeave(e);
        }}
        onClick={disabled ? () => {} : onClick}
        className={`${className} gap-2 text-white p-2 py-1 rounded text-sm items-center flex ${highlightColor}`}>
        <div>{text}</div>
        {/* <div>{id}</div> */}
        {onRemove ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            className="ml-auto cursor-pointer">
            &times;
          </span>
        ) : null}
      </div>
    </div>
  );
};
