import Button from "@mui/material/Button";

export default function CommonButton({
  children,
  variant = "contained",
  color = "primary",
  onClick,
  type = "button",
  startIcon,
  sx,
  ...props
}) {
  return (
    <Button
      variant={variant}
      color={color}
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