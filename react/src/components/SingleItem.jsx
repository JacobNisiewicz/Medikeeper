import React from "react"
import PropTypes from "prop-types";
import * as itemsService from '../services/itemsService';


const SingleItem = (props) => {

    const editItem = () => {
        let itemValue = {
            id: props.item.id,
            itemName: props.item.itemName,
            cost: props.item.cost
        }
        props.edit(itemValue)
    };

    const deleteClick = (e) => {
        e.preventDefault();
        let itemId = props.item.id;
        deleteItemById(itemId);
    };

    const deleteItemById = data => {
        itemsService.deleteItem(data)
            .then(onDeleteSuccess)
            .catch(onDeleteError)
    };

    const onDeleteSuccess = () => {
        props.delete(props.item.id)
    };

    const onDeleteError = (error) => {
        console.log(error)
    };

    return (
        <React.Fragment>
            <div className="card my-2 shadow">
                <div className="m-3"><h3>Item Name: {props.item.itemName}</h3></div>
                <div className="m-3"><h3>Cost: ${props.item.cost}</h3></div>
                <div className="row m-2 ">
                    <div className="mx-3">
                        <button className="btn btn-primary" type="button" onClick={editItem}>Edit</button>
                    </div>
                    <div className="mx-3">
                        <button className="btn btn-danger" type="button" onClick={deleteClick}>Delete</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
SingleItem.propTypes = {
    edit: PropTypes.func,
    delete: PropTypes.func,
    item: PropTypes.shape({
        id: PropTypes.number,
        itemName: PropTypes.string,
        cost: PropTypes.number
    })
}
export default SingleItem