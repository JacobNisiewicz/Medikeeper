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

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
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
                            <div>{this.state.itemCost}</div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="getAllItems card col-sm-5 shadow">
                            <div className="row my-2">
                                <div className="col-12">
                                    <button className="btn btn-primary col-12" type="submit" onClick={this.getAll}>
                                        Get All
                                    </button>
                                    {this.state.mappedCost}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row mt-5">
                        <div className="addEditForm card col-sm-5 shadow">
                            <div className="row my-2">
                                <div className="col-12">
                                    <button className="btn btn-primary col-12" type="submit" onClick={this.addEditClick}>
                                        Add Item
                                    </button>

                                </div>
                            </div>
                        </div>

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