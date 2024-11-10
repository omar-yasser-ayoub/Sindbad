import { createComplaint } from "@/services/ComplaintApiHandler";

export const complaintSubmit = (values, id, navigate, dispatch) => {
    const newComplaint  = {
      ...values,
      creatorId: id
    }
    createComplaint(newComplaint);
    console.log(values)
}