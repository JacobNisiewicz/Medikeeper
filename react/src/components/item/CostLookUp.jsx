import React from "react";
import { Formik, Form, Field } from "formik";
import costLookUpValidation from "./itemValidationSchema";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";

const CostLookUp = ({ formData, handleGetCostSubmit }) => {
  return (
    <div className="row items">
      <div className="card col-12 shadow">
        <div className="m-3">
          <h3 className="text-center">Look Up Item Cost</h3>
          <Formik
            enableReinitialize={true}
            validationSchema={costLookUpValidation}
            initialValues={formData}
            onSubmit={handleGetCostSubmit}
          >
            {props => {
              const { values, touched, errors, isValid, isSubmitting } = props;
              return (
                <Form>
                  <FormGroup>
                    <Label className="mt-3">Item Name</Label>
                    <Field
                      name="itemNameLookUp"
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
                  </FormGroup>
                  <div className="row my-2">
                    <div className="col-12">
                      <button
                        className="btn btn-primary col-12"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                    <div></div>
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

CostLookUp.propTypes = {
  formData: PropTypes.shape({
    id: PropTypes.number,
    itemName: PropTypes.string,
    cost: PropTypes.string
  }),
  handleGetCostSubmit: PropTypes.func,
  values: PropTypes.object,
  isValid: PropTypes.bool,
  touched: PropTypes.bool,
  errors: PropTypes.object,
  isSubmitting: PropTypes.bool
};

export default CostLookUp;
