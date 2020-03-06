using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ItemRequests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemsApiController : BaseApiController
    {
        private IItemsService _itemsService = null;

        private IAuthenticationService<int> _authService = null;

        public ItemsApiController(IItemsService itemsService, IAuthenticationService<int> authService, ILogger<ItemsApiController> logger) : base(logger)
        {
            _itemsService = itemsService;
            _authService = authService;
        }

        [HttpGet("itemsfeed")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<List<Items>>> GetItems()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Items> item = _itemsService.GetCost();
                if (item == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<List<Items>> { Item = item };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("cost/{itemName}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> GetCost(string itemName)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int cost = _itemsService.GetItemCostByName(itemName);

                if (cost == 0)
                {
                    code = 404;
                    response = new ErrorResponse("Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<int> { Item = cost };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(ItemAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _itemsService.Add(model);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> Update(ItemUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _itemsService.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _itemsService.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}