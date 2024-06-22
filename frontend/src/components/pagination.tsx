import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

interface PaginationProps {
  pagination: { pageNo: number; totalPages: number };
  prevPageCallBack: (pageNo: number) => void;
  nextPageCallBack: (pageNo: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { pagination, prevPageCallBack, nextPageCallBack } = props;

  const canGoToPrev = (): boolean => pagination.pageNo > 1;

  const canGoToNext = (): boolean => pagination.pageNo < pagination.totalPages;

  const goToPrevPage = () => {
    if (pagination.pageNo === 1) {
      return;
    }
    return prevPageCallBack(pagination.pageNo - 1);
  };

  const goToNextPage = () => {
    if (pagination.pageNo >= pagination.totalPages) {
      return;
    }
    return nextPageCallBack(pagination.pageNo + 1);
  };

  return (
    <Box sx={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Typography>
          {pagination.pageNo} of {pagination.totalPages} pages
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <IconButton onClick={goToPrevPage} disabled={!canGoToPrev()}>
            <KeyboardArrowLeftRoundedIcon />
          </IconButton>
          <IconButton onClick={goToNextPage} disabled={!canGoToNext()}>
            <KeyboardArrowRightRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
