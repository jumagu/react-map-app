export const Loading = ({
  spinnerStyle,
  containerStyle,
  containerClassName,
}: {
  containerClassName?: string;
  spinnerStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}) => {
  return (
    <div className={containerClassName} style={containerStyle}>
      <article aria-busy="true" style={spinnerStyle}></article>
    </div>
  );
};
