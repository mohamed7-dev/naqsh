import { LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";

type CustomButtonProps = React.ComponentProps<typeof Button>;
type LoadingButtonProps = CustomButtonProps & {
  loading: boolean;
  loaderColor?: string;
  loaderSize?: number;
};
function LoadingButton(props: LoadingButtonProps) {
  const {
    loading,
    loaderColor = "#001",
    loaderSize = 4,
    children,
    ...rest
  } = props;
  return (
    <Button {...rest}>
      {loading && (
        <LoaderIcon
          className="animate-spin"
          style={{
            width: loaderSize,
            height: loaderSize,
            color: loaderColor,
          }}
        />
      )}
      {children}
    </Button>
  );
}
export { LoadingButton };
