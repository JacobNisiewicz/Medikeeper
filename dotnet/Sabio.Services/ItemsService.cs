using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ItemRequests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class ItemsService : IItemsService
    {
        IDataProvider _data = null;

        public ItemsService(IDataProvider data)
        {
            _data = data;
        }

        public List<Items> GetCost()
        {
            List<Items> list = null;

            string procName = "dbo.Item_SelectAll";

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper:
                delegate (IDataReader reader, short set)
                {
                    Items item = new Items();

                    int startingIndex = 0;

                    item.Id = reader.GetSafeInt32(startingIndex++);
                    item.ItemName = reader.GetSafeString(startingIndex++);
                    item.Cost = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Items>();
                    }
                    list.Add(item);
                }
            );
            return list;
        }

        public int GetItemCostByName(string itemName)
        {
            int cost = 0;

            string procName = "dbo.Item_SelectBy_ItemName";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@ItemName", itemName);

            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                cost = reader.GetSafeInt32(startingIndex++);
            }
            );
            return cost;
        }

        public int Add(ItemAddRequest model)
        {
            int id = 0;
            string procName = "dbo.Item_Insert";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                CommonParams(model, col);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object outId = returnCollection["@Id"].Value;

                int.TryParse(outId.ToString(), out id);
            });
            return id;
        }

        public void Update(ItemUpdateRequest model)
        {
            string procName = "dbo.Item_Update";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                CommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "dbo.Item_Delete";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }

        private static void CommonParams(ItemAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@ItemName", model.ItemName);
            col.AddWithValue("@Cost", model.Cost);
        }

        private static Items MapItem(IDataReader reader)
        {
            Items item = new Items();

            int startingIndex = 0;
            item.Id = reader.GetSafeInt32(startingIndex++);
            item.ItemName = reader.GetSafeString(startingIndex++);
            item.Cost = reader.GetSafeInt32(startingIndex++);
            return item;
        }
    }
}
