import { Box, Button, ButtonProps, CircularProgress, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const DefaultButton: React.FC<CustomButtonProps> = (props) => {
  const { LeftIcon, title, RightIcon, loading, variant, size, ...rest } = props;

  return (
    <Button
      variant={variant ?? "contained"}
      sx={{
        padding: size === "small" ? "0.2rem  1rem" : "0.5rem 1rem 0.5rem 1rem",
        fontSize: "0.8rem",
        display: "flex",
        alignItems: "center",
        borderRadius: "0.4rem",
      }}
      {...rest}
      disableElevation
    >
      {LeftIcon && <LeftIcon sx={{ width: "1.08rem", height: "1.08rem", margin: "auto 0.4rem auto -0.2rem" }} />}
      {loading ? <CircularProgress size="1.4rem" /> : <Box>{title}</Box>}
      {RightIcon && <RightIcon sx={{ width: "1.08rem", height: "1.08rem", margin: "auto -0.2rem auto 0.4rem" }} />}
    </Button>
  );
};

interface CustomButtonProps extends ButtonProps {
  LeftIcon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  title: string;
  RightIcon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  loading?: boolean;
}
