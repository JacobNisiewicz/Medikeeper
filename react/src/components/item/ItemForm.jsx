import React from "react";
import { Formik, Form, Field } from "formik";
import itemFormValidation from "./itemValidationSchema";
import { FormGroup, Label } from "reactstrap";
import { PropTypes } from "prop-types";

const ItemForm = ({ handleSubmit, formData, isEditing }) => {
  return (
    <div className="row">
      <div className="card col-12 shadow mt-5">
        <div className="m-3">
          <h3 className="text-center">Item Form</h3>
          <Formik
            enableReinitialize={true}
            validationSchema={itemFormValidation}
            initialValues={formData}
            onSubmit={handleSubmit}
          >
            {props => {
              const { values, touched, errors, isValid, isSubmitting } = props;
              return (
                <Form>
                  <FormGroup>
                    <Label className="mt-3">Item Name</Label>
                    <Field
                      name="itemName"
                      type="text"
                      values={values.itemName}
                      placeholder="Item Name"
                      autoComplete="off"
                      className={
                        errors.itemName && touched.itemName
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.itemName && touched.itemName && (
                      <span className="input-feedback">{errors.itemName}</span>
                    )}
                    <Label className="mt-3">Cost</Label>
                    <Field
                      name="cost"
                      type="text"
                      values={values.cost}
                      placeholder="Cost"
                      autoComplete="off"
                      className={
                        errors.cost && touched.cost
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.cost && touched.cost && (
                      <span className="input-feedback">{errors.cost}</span>
                    )}
                  </FormGroup>

                  <div className="row my-2">
                    <div className="col-12">
                      <button
                        className="btn btn-primary col-12"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                      >
                        {isEditing ? "Update" : "Submit"}
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

ItemForm.propTypes = {
  isEditing: PropTypes.bool,
  formData: PropTypes.shape({
    id: PropTypes.number,
    itemName: PropTypes.string,
    cost: PropTypes.string
  }),
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  isValid: PropTypes.bool,
  touched: PropTypes.bool,
  errors: PropTypes.object,
  isSubmitting: PropTypes.bool
};
export default ItemForm;
