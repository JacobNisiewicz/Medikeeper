using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ItemRequests;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Services
{
    public interface IItemsService
    {
        List<Items> GetCost();
        int GetItemCostByName(string itemName);
        int Add(ItemAddRequest model);
        void Update(ItemUpdateRequest model);
        void Delete(int id);
    }
}
