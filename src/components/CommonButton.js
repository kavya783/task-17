import Button from "@mui/material/Button";

export default function CommonButton({
  children,
  variant = "contained",
  onClick,
  type = "button",
  startIcon,
  sx,
  ...props
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={type}
      startIcon={startIcon}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        px: 2,
        py: 1,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}