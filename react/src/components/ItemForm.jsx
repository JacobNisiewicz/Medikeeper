import React from 'react';
import { Formik, Form, Field } from "formik";
import * as itemsService from '../services/itemsService';
import { PropTypes } from "prop-types";

const ItemForm = (props) => {
    console.log(props)

    const submit = (formValues) => {
        console.log(formValues)
        const itemDetails = {
            itemName: formValues.itemName,
            cost: formValues.cost
        }
        itemsService.addItem(itemDetails)
            .then(addItemSuccess)
            .catch(addItemError)
    }

    const addItemSuccess = () => {
        props.refresh()
    }

    const addItemError = () => {

    }

    return (
        <React.Fragment>

            <div className="card itemForm shadow col-sm-5">
                <div className="m-3">
                    <div style={{ textAlign: "center" }}><h3>Add Form</h3></div>
                    <Formik
                        enableReinitialize={true}
                        onSubmit={submit}
                        render={formikProps => (
                            <Form >
                                <div >
                                    <label
                                        htmlFor="itemName"
                                    >
                                        <strong>Item Name</strong>
                                    </label>
                                    <Field
                                        name="itemName"
                                        component="input"
                                        placeholder="Item Name"
                                        className="form-control"
                                        value={formikProps.itemName}
                                    />
                                    {formikProps.touched.itemName &&
                                        formikProps.errors.itemName && (
                                            <div className="text-danger">
                                                {formikProps.errors.itemName}
                                            </div>
                                        )}
                                </div>
                                <div >
                                    <label
                                        htmlFor="cost"
                                    >
                                        <strong>Cost</strong>
                                    </label>
                                    <Field
                                        name="cost"
                                        placeholder="Cost"
                                        component="input"
                                        className="form-control"
                                        value={formikProps.cost}
                                    />
                                    {formikProps.touched.cost &&
                                        formikProps.errors.cost && (
                                            <div className="text-danger">
                                                {formikProps.errors.cost}
                                            </div>
                                        )}
                                </div>
                                <div >

                                    <button type="submit" className="btn-shadow my-3 btn btn-primary btn-sm">
                                        Submit
                      </button>
                                </div>
                            </Form>
                        )}
                    ></Formik>
                </div>
            </div>
        </React.Fragment>
    )
}
ItemForm.propTypes = {
    refresh: PropTypes.func
}

export default ItemForm;