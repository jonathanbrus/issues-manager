"use client";

import { Box, Divider, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TTicketCategories, TTicketPriorities, ticketCategories, ticketPriorities } from "@/core/interfaces/ticket";
import { SupportTicketsFeature } from "@/features/tickets";
import { useAppDispatch } from "@/hooks/store";
import { DefaultBaseModal } from "@/components/modal";
import { DefaultTextInput } from "@/components/text-input";
import { DefaultButton } from "@/components/button";
import { CustomSelect } from "@/components/select";

export const CreateTicketModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const formValidation = Yup.object({
    category: Yup.string().required(),
    orderId: Yup.string().optional(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    priority: Yup.string().required(),
    attachments: Yup.array().optional(),
  });

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      category: "general inquiry" as TTicketCategories,
      orderId: "",
      title: "",
      description: "",
      priority: "medium" as TTicketPriorities,
      attachments: [],
    },

    validationSchema: formValidation,

    onSubmit: async (formValues, helper) => {
      await SupportTicketsFeature.createTicket(formValues)(dispatch);
      onClose();
      helper.resetForm();
    },
  });

  const handleOnSubmit = () => {
    formik.submitForm();
  };

  const handleOnCancel = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <DefaultBaseModal isOpen={isOpen} onClose={handleOnCancel}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ padding: "0.6rem 0rem" }}>
          <Typography variant="body1" sx={{ fontSize: "1rem", fontWeight: "600" }}>
            Create New Ticket
          </Typography>
        </Box>
        <Divider sx={{ margin: "0.2rem 0rem 0.8rem 0rem" }} />
        <Box>
          <CustomSelect
            title="Category"
            options={Object.keys(ticketCategories)}
            value={formik.values.category}
            onChange={(categoryOption: string) => {
              formik.setFieldValue("category", categoryOption);
            }}
          />
          {formik.values.category === "order" && (
            <DefaultTextInput
              sx={{ margin: "0.8rem 0rem" }}
              label="Order ID"
              name="orderId"
              value={formik.values.orderId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.orderId && Boolean(formik.errors.orderId)}
              helperText={formik.touched.orderId && formik.errors.orderId}
            />
          )}
          <DefaultTextInput
            sx={{ margin: "0.8rem 0rem" }}
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <DefaultTextInput
            sx={{ margin: "0.8rem 0rem" }}
            label="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <CustomSelect
            title="Priority"
            options={Object.keys(ticketPriorities)}
            value={formik.values.priority}
            onChange={(priorityOption: string) => {
              formik.setFieldValue("priority", priorityOption);
            }}
          />
          <Box sx={{ padding: "0.6rem 0rem", display: "flex", gap: "1rem" }}>
            <DefaultButton
              variant="outlined"
              disabled={formik.isSubmitting}
              title="Cancel"
              onClick={handleOnCancel}
              fullWidth
            />
            <DefaultButton
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              title="Create"
              onClick={handleOnSubmit}
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </DefaultBaseModal>
  );
};
