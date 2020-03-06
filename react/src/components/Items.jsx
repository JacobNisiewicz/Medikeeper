import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormGroup, Label } from 'reactstrap';
import * as Yup from "yup";
import * as itemsService from '../services/itemsService';
import SingleItem from './SingleItem';
import { PropTypes } from "prop-types";

export default class Items extends React.Component {

    state = {
        formData: {
            itemName: ""
        }
    };

    handleSubmit = (value, { resetForm }) => {
        itemsService.getCost(value)
            .then(this.getCostSuccess)
            .catch(this.getCostError)

        resetForm(this.state.formData);
    };

    getCostSuccess = (response) => {
        this.setState(() => {
            return {
                itemCost: response.data.item
            }
        })
    };

    getCostError = (error) => {
        console.log(error, "Error getting the cost.")
    }

    getAll = () => {
        itemsService.getAll()
            .then(this.getAllSuccess)
            .catch(this.getAllError)
    }

    getAllSuccess = (response) => {
        let aCost = response.data.item.map(this.mapItems)

        this.setState(() => {
            return {
                mappedCost: aCost
            }
        })
    }

    editItem = (item) => {
        this.props.history.push("/itemForm", item)
    }

    refreshItems = () => {
        this.getAll()
    }

    mapItems = aItem => {
        return (
            <SingleItem
                item={aItem}
                key={aItem.id}
                edit={this.editItem}
                delete={this.refreshItems}
            />
        )
    }

    getAllError = (error) => {
        console.log(error)
    }

    addEditClick = () => {
        this.props.history.push("/itemForm")
    }

    submit = (formValues) => {
        console.log(formValues)
        const itemDetails = {
            itemName: formValues.itemName,
            cost: formValues.cost
        }
        itemsService.addItem(itemDetails)
            .then(this.addItemSuccess)
            .catch(this.addItemError)


    }

    addItemSuccess = () => {
        this.refreshItems()
    }

    addItemError = (error) => {
        console.log(error)
    }

    render() {
        return (
            <React.Fragment>
                <div className="row items">
                    <div className="card col-sm-5 shadow">
                        <div className="m-3">
                            <div style={{ textAlign: "center" }}><h3>Items</h3></div>
                            <Formik enableReinitialize={true}
                                validationSchema={Yup.object().shape({
                                    itemName: Yup.string().required("Required")
                                })}
                                initialValues={this.state.formData}
                                onSubmit={this.handleSubmit}>
                                {props => {
                                    const {
                                        values,
                                        touched,
                                        errors,
                                        handleSubmit,
                                        isValid,
                                        isSubmitting
                                    } = props;
                                    return (
                                        <Form onSubmit={handleSubmit}>
                                            <FormGroup>
                                                <Label>Item Name</Label>
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
                                            </FormGroup>

                                            <div className="row my-2">
                                                <div className="col-12">
                                                    <button className="btn btn-primary col-12" type="submit" disabled={!isValid || isSubmitting}>
                                                        Submit
                </button></div>
                                                <div>
                                                </div>
                                            </div>

                                        </Form>
                                    );
                                }}

                            </Formik>
                        </div>
                    </div>
                    {this.state.itemCost ? (<div className="col">
                        <div className="card col-sm-3 m-3"><div>Cost ${this.state.itemCost}</div></div>
                    </div>) : null}

                </div>


                <div className="row mt-5">
                    <div className="getAllItems col-sm-5 ">
                        <div className="row my-2">
                            <button className="btn btn-primary col-12" type="submit" onClick={this.getAll}>
                                Get All
                                    </button>
                        </div>
                    </div>
                    <div className="col-sm-3">{this.state.mappedCost}</div>
                </div>

                <div className="card itemForm shadow col-sm-5 mt-5">
                    <div className="m-3">
                        <div style={{ textAlign: "center" }}><h3>Add Item</h3></div>
                        <Formik
                            enableReinitialize={true}
                            onSubmit={this.submit}
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
}

Items.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
}