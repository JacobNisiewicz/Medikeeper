import axios from "axios";
import { API_HOST_PREFIX } from "./serviceHelpers";

const rootUrl = `${API_HOST_PREFIX}/api/items`;

let getCost = value => {
  let url = rootUrl + `/cost/${value.itemName}`;
  const config = {
    method: "GET",
    url: url,
    withCredentials: true,
    header: {
      "Content-Type": "application/json"
    }
  };
  return axios(config);
};

let getAll = () => {
  let url = rootUrl + "/itemsfeed";
  const config = {
    method: "GET",
    url: url,
    header: {
      "Content-Type": "application/json"
    }
  };
  return axios(config);
};

let addItem = data => {
  const config = {
    method: "POST",
    url: rootUrl,
    header: {
      "Content-Type": "application/json"
    },
    data: data
  };
  return axios(config);
};

let updateItem = id => {
  let url = rootUrl + `/${id}`;
  const config = {
    method: "PUT",
    url: url,
    header: {
      "Content-Type": "application/json"
    }
  };
  return axios(config);
};

let deleteItem = id => {
  let url = rootUrl + `/${id}`;
  const config = {
    method: "DELETE",
    url: url,
    header: {
      "Content-Type": "application/json"
    }
  };
  return axios(config);
};

export { getCost, getAll, addItem, updateItem, deleteItem };
