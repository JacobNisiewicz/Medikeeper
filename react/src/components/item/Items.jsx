import React from "react";
import * as itemsService from "../../services/itemsService";
import SingleItem from "./SingleItem";
import CostLookUp from "./CostLookUp";
import ItemForm from "./ItemForm";
import { toast } from "react-toastify";

export default class Items extends React.Component {
  state = {
    formData: {
      id: 0,
      itemName: "",
      cost: ""
    },
    isEditing: false,
    costs: [],
    mappedCost: [],
    itemCost: 0
  };

  getAll = () => {
    itemsService
      .getAll()
      .then(this.getAllSuccess)
      .catch(this.getAllError);
  };

  getAllSuccess = response => {
    const costs = response.data.item;
    this.setState(() => {
      return {
        costs,
        mappedCost: costs.map(this.mapItems)
      };
    });
  };

  getAllError = error => {
    console.log(error, "Get all error");
    toast("There was an error processing your request, please try again.");
  };

  mapItems = aItem => (
    <SingleItem
      item={aItem}
      key={aItem.id}
      edit={this.editItem}
      delete={this.onDelete}
    />
  );

  editItem = item => {
    this.setState(() => {
      return {
        formData: { ...item },
        isEditing: true
      };
    });
  };

  handleSubmit = (formValues, { resetForm }) => {
    const itemDetails = {
      ...formValues
    };
    if (itemDetails.id && itemDetails.id > 0) {
      itemsService.updateItem(itemDetails).then(this.onEditSubmitSuccess);
    } else {
      itemsService.addItem(itemDetails).then(this.onSubmitSuccess);
    }
    resetForm(this.state.formData);
  };

  onSubmitSuccess = res => {
    this.setState(prevState => {
      let costs =
        prevState.costs.length > 0 ? [...prevState.costs].concat(res) : [];
      return {
        costs,
        mappedCost: costs.map(this.mapItems)
      };
    });
  };

  onEditSubmitSuccess = updatedItem => {
    let costs = [...this.state.costs];
    let index = costs.findIndex(item => item.id === updatedItem.id);
    if (index > -1) {
      costs[index] = updatedItem;
      this.setState(prevState => {
        return {
          ...prevState,
          formData: {
            id: null,
            itemName: "",
            cost: ""
          },
          isEditing: false,
          costs,
          mappedCost: costs.map(this.mapItems)
        };
      });
    }
  };

  onDelete = deletedItem => {
    let index = this.state.mappedCost.findIndex(
      item => item.id === deletedItem
    );
    let costsArray = [...this.state.mappedCost];
    costsArray.splice(index, 1);
    this.setState(prevState => {
      return {
        ...prevState.mappedCost,
        mappedCost: costsArray
      };
    });
    if (this.state.mappedCost.length > 0) {
      this.getAll();
    }
  };

  handleGetCostSubmit = (value, { resetForm }) => {
    let itemName = value.itemNameLookUp;
    itemsService.getCost(itemName).then(this.handleGetCostSubmitSuccess);
    resetForm(this.state.formData);
  };

  handleGetCostSubmitSuccess = res => {
    this.setState(prevState => {
      return {
        ...prevState,
        itemCost: res.itemCost
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            {" "}
            <CostLookUp
              handleGetCostSubmit={this.handleGetCostSubmit}
              formData={this.state.formData}
            />
            <div className="row mt-5">
              <div className="col-12 card shadow">
                <div className="col-12 my-3">
                  <button
                    className="btn btn-primary col-12"
                    type="submit"
                    onClick={this.getAll}
                  >
                    Get All Costs
                  </button>
                </div>
              </div>
            </div>
            {
              <ItemForm
                handleSubmit={this.handleSubmit}
                formData={this.state.formData}
                isEditing={this.state.isEditing}
              />
            }
          </div>
          <div className="col-md-6">
            {this.state.itemCost && this.state.itemCost > 0 ? (
              <div className="card shadow">
                <div>
                  <h3 className="text-center m-3">
                    Cost ${this.state.itemCost}
                  </h3>
                </div>
              </div>
            ) : null}
            {this.state.mappedCost}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
