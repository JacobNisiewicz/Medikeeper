import * as Yup from "yup";

let costLookUpValidation = () => {
  return Yup.object().shape({
    itemName: Yup.string().required("Required")
  });
};

let itemFormValidation = () => {
  return Yup.object().shape({
    itemName: Yup.string().required("Required"),
    cost: Yup.string().required("Required")
  });
};

export default { costLookUpValidation, itemFormValidation };
