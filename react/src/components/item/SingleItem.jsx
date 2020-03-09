import React from "react";
import PropTypes from "prop-types";
import * as itemsService from "../../services/itemsService";
import { toast } from "react-toastify";

const SingleItem = props => {
  const editItem = () => {
    props.edit(props.item);
  };

  const deleteClick = e => {
    e.preventDefault();
    let itemId = props.item.id;
    itemsService
      .deleteItem(itemId)
      .then(onDeleteSuccess)
      .catch(onDeleteError);
  };

  const onDeleteSuccess = () => {
    let itemId = props.item.id;
    props.delete(itemId);
  };

  const onDeleteError = error => {
    console.log(error);
    toast(
      "There was an error deleting the selected item, please refresh the page and try again."
    );
  };

  return (
    <React.Fragment>
      <div className="card my-2 shadow">
        <div className="m-3">
          <h3>Item Name: {props.item.itemName}</h3>
        </div>
        <div className="m-3">
          <h3>Cost: ${props.item.cost}</h3>
        </div>
        <div className="row m-2 ">
          <div className="mx-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={editItem}
            >
              Edit
            </button>
          </div>
          <div className="mx-3">
            <button
              className="btn btn-danger"
              type="button"
              onClick={deleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
SingleItem.propTypes = {
  edit: PropTypes.func,
  delete: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number,
    itemName: PropTypes.string,
    cost: PropTypes.number
  })
};
export default SingleItem;
