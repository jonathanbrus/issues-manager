import { Modal, Container, Paper } from "@mui/material";

interface DefaultModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const DefaultBaseModal: React.FC<DefaultModalProps> = (props) => {
  const { children, isOpen, onClose } = props;

  return (
    <Modal open={isOpen} onClose={onClose} sx={{ backdropFilter: "blur(2px)" }}>
      <Container>
        <Paper
          sx={{
            width: "calc(100vw - 2rem)",
            maxWidth: "32rem",
            display: "flex",
            padding: "0.4rem 1rem",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "none",
            borderRadius: "0.6rem",
          }}
        >
          {children}
        </Paper>
      </Container>
    </Modal>
  );
};
